import React from 'react';
import {abilities} from "../Models/Abilities";
import {attacks} from "../Models/Attacks.js";
import {character} from '../Models/Character.js';
import {leftColumnSkills, rightColumnSkills} from "../Models/Skills.js";
import {limitedUses} from "../Models/LimitedUses.js";
import {passives} from "../Models/Passives.js";
import {Ability} from '../Components/Ability.js';
import {Attack} from '../Components/Attack.js';
import {ExpandableItem} from "../Components/Generic/ExpandableItem.js";
import {Header} from '../Components/Header.js';
import {LimitedUse} from '../Components/LimitedUse.js';
import {Item} from '../Components/Item.js';
import {Panel} from '../Components/Generic/Panel.js';
import {Skill} from '../Components/Skill.js';
import { api } from "../API/requests"

const AbilitiesPanel = (props) => {
  return (
      <Panel title="ABILITIES">
          <table>
            <tbody>
              {props.abilities.map(item => <Ability key={item.name} ability={item}/>)}
            </tbody>
          </table>
      </Panel>
  );
}

const SkillsPanel = (props) => {
  return (
      <Panel title="SKILLS">
          <div className="skill-column">
            {props.leftColumnSkills.map(skill => <Skill key={skill.skillName} skill={skill}/>) } 
          </div>
          <div className="skill-column skill-column-leftBorder">
            {props.rightColumnSkills.map(skill => <Skill key={skill.skillName} skill={skill}/>) } 
          </div>
      </Panel>
  );
};

const AttacksPanel = (props) => {
  return (
    <Panel title="ATTACKS">
        <div className="attacks-perAction">
        Attacks Per Action: 1
        </div>
        {props.attacks.map(attack => <Attack key={attack.name} attack={attack} adversityMod={props.adversityMod}/>)}
    </Panel>
  );
};

const PassivesPanel = (props) => {
  return (
    <Panel title="PASSIVES">
        {props.passives.map(passive => <ExpandableItem key={passive.id} expandableItemHeader={passive.name} expandableItemBody={passive.description}/>)}
    </Panel>
  );
};

export class Dashboard extends React.Component {
  constructor() {
    super();
    const newRemainingUses = limitedUses.reduce( (accumulator, currentValue) => { 
      accumulator[currentValue.id] = currentValue.maxUses; 
      return accumulator;
    }, {});
    this.state = {
      remainingHealth: character.maximumHealth, 
      remainingUses: newRemainingUses,
      inventory: []
    }
  }

  componentDidMount() {
    // api.getAllItems().then(res => {
    //   console.log("Request to fetch all items finished.");
    //   console.log(res);
    //   this.setState(() => ({inventory: res.data}));
    // });
    const items = [
      {
        _id: 1,
        name: "item1",
        description: "something",
        quantity: 1
      },
      {
        _id: 2,
        name: "item2",
        description: "something2",
        quantity: 1
      }
    ]
    this.setState(() => ({inventory: items}));
  }

  decreaseHealthHandler = () => {
    this.setState((prevState, props) => {
        if (prevState.remainingHealth !== 0) {
            return {remainingHealth: prevState.remainingHealth - 1};
        }
    })
  }

  increaseHealthHandler = () => {
      this.setState((prevState, props) => {
          if (prevState.remainingHealth < character.maximumHealth) {
              return {remainingHealth: prevState.remainingHealth + 1};
          }
      })
  }

  handleLimitedUseDecrease = (id) => {
    this.setState((prevState, props) => { 
      // TODO this is bad. Rewrite. 
      const newValue = prevState.remainingUses[id] > 0 ? prevState.remainingUses[id] - 1 : 0;
      return {remainingUses: {...prevState.remainingUses, [id]: newValue}}
    });
  };

  handleLimitedUseIncrease = (id) => {
    this.setState((prevState, props) => { 
      // TODO this is bad. Rewrite. 
      const maxUses = limitedUses[id - 1].maxUses;
      const newValue = prevState.remainingUses[id] < maxUses ? prevState.remainingUses[id] + 1 : maxUses;
      return {remainingUses: {...prevState.remainingUses, ...{[id]: newValue}}}
    });
  };

  handleShortRest = () => {
    this.setState((prevState, props) => {
      const newRemainingUses = limitedUses.reduce( (accumulator, currentValue) => {
        if (currentValue.shortRestRecover) {
          accumulator[currentValue.id] = currentValue.maxUses; 
        } 
        return accumulator;
      }, {});

      return {remainingUses: {...prevState.remainingUses, ...newRemainingUses}};
    });
  }

  handleLongRest = () => {
    this.setState((prevState, props) => {
      const newRemainingUses = limitedUses.reduce( (accumulator, currentValue) => { 
        accumulator[currentValue.id] = currentValue.maxUses; 
        return accumulator;
      }, {});

      return {remainingUses: newRemainingUses, remainingHealth: character.maximumHealth};
    });
  }

  handleItemDecrease = (id) => {
    // this.setState((prevState, props) => { 
    //   // TODO this is bad. Rewrite. 
    //   const newValue = prevState.remainingUses[id] > 0 ? prevState.remainingUses[id] - 1 : 0;
    //   return {remainingUses: {...prevState.remainingUses, [id]: newValue}}
    // });
  };

  handleItemIncrease = (id) => {
    // this.setState((prevState, props) => { 
    //   // TODO this is bad. Rewrite. 
    //   const maxUses = limitedUses[id - 1].maxUses;
    //   const newValue = prevState.remainingUses[id] < maxUses ? prevState.remainingUses[id] + 1 : maxUses;
    //   return {remainingUses: {...prevState.remainingUses, ...{[id]: newValue}}}
    // });
  };

  renderLimitedUses = (limitedUses) => {
    return limitedUses.map((item) => 
      <LimitedUse 
        key={item.id} 
        limitedUse={item} 
        remainingUses={this.state.remainingUses[item.id]}
        handleDecrease={() => this.handleLimitedUseDecrease(item.id)}
        handleIncrease={() => this.handleLimitedUseIncrease(item.id)}/>
    );
  };

  renderInventory = (inventory) => {
    return inventory.map((item) => 
      <Item 
        key={item._id} 
        item={item}
        handleDecrease={() => this.handleItemDecrease(item._id)}
        handleIncrease={() => this.handleItemIncrease(item._id)}
      />
    );
  };

  render() {
    const adversityMod = Math.floor((1-(this.state.remainingHealth/character.maximumHealth)) * 4);

    return (
      <div className="App">
        <div className="App-header">
          <Header character={character} remainingHealth={this.state.remainingHealth} decreaseHealthHandler={this.decreaseHealthHandler} increaseHealthHandler={this.increaseHealthHandler}/>
        </div>
        <div className="App-body">
        <div className="dashboard">
          <div className="row">
            <div className="col-xs-6 col-md-4">
              <div className="dashboard-panel">
                <AbilitiesPanel abilities={abilities}/>
              </div>
              <div className="dashboard-panel">
                <SkillsPanel leftColumnSkills={leftColumnSkills} rightColumnSkills={rightColumnSkills}/>
              </div>
            </div>
            <div className="col-xs-6 col-md-4">
              <div className="dashboard-panel">
                <Panel title="LIMITED USE">
                  <div className="rest-buttons">
                    <button className="shortRest" onClick={this.handleShortRest}>SHORT REST</button>
                    <button className="longRest" onClick={this.handleLongRest}>LONG REST</button>
                  </div>
                  {this.renderLimitedUses(limitedUses)}
                </Panel>            
              </div>
              <div>
                <PassivesPanel passives={passives}/>
              </div>
            </div>
            <div className="col-xs-6 col-md-4">
              <div className="dashboard-panel">
                <AttacksPanel attacks={attacks} adversityMod={adversityMod}/>
              </div>
            </div>
            <div className="col-xs-6 col-md-4">
              <div className="dashboard-panel">
                <Panel title="INVENTORY">
                  {this.renderInventory(this.state.inventory)}
                </Panel>    
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}