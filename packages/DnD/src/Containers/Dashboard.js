import React from 'react';
import {abilities} from "../Models/Abilities";
import {attacks} from "../Models/Attacks.js";
import {character} from '../Models/Character.js';
import {currency} from '../Models/Currency.js';
import {Items} from '../Models/Items.js';
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
// import { api } from "../API/requests";

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
        Attacks Per Action: 2
        </div>
        {props.attacks.map(attack => <Attack key={attack.name} attack={attack} adversityMod={props.adversityMod}/>)}
    </Panel>
  );
};

const PassivesPanel = (props) => {
  return (
    <Panel title="PASSIVES">
        {props.passives.map(passive => 
          <ExpandableItem 
            key={passive.id} 
            expandableItemHeader={
              <span className="passive-name">
                {passive.name}
              </span>
            } 
            expandableItemBody={passive.description}
          />)}
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
      inventory: [],
      currencyTabActive: false,
      currency: currency,
      addNewItemExpanded: true
    }
  }

  componentDidMount() {
    // api.getAllItems().then(res => {
    //   console.log("Request to fetch all items finished.");
    //   console.log(res);
    //   this.setState(() => ({inventory: res.data}));
    // });

    this.setState(() => ({inventory: Items}));
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

  decreaseHealthBy10Handler = () => {
    this.setState((prevState, props) => {
      if (prevState.remainingHealth - 10 >= 0) {
          return {remainingHealth: prevState.remainingHealth - 10};
      } else {
        return {remainingHealth: 0};
      }
    })
  }

  increaseHealthBy10Handler = () => {
    this.setState((prevState, props) => {
      if (prevState.remainingHealth + 10 <= character.maximumHealth) {
          return {remainingHealth: prevState.remainingHealth + 10};
      } else if (prevState.remainingHealth + 10 > character.maximumHealth) {
        return {remainingHealth: character.maximumHealth};
      }
    });
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
    return (
      <div>
        {inventory.map((item) => 
          <Item 
            key={item._id} 
            item={item}
            handleDecrease={() => this.handleItemDecrease(item._id)}
            handleIncrease={() => this.handleItemIncrease(item._id)}
            />
        )}
        <div> 
          <button 
            className="shortRest" 
            onClick={() => {this.setState(prevState =>  ({addNewItemExpanded: !prevState.addNewItemExpanded}))}}
          >
            Add item
          </button>
          { this.state.addNewItemExpanded && <button 
            className="shortRest blue" 
            onClick={() => {this.setState(prevState =>  ({addNewItemExpanded: !prevState.addNewItemExpanded}))}}
          >
            Submit
          </button>}

          { this.state.addNewItemExpanded && this.renderAddItemForm() }
        </div>
      </div>
    );
  };

  renderAddItemForm = () => {
    return (
      <div>
        <div className="addItem-row">
          <span className="input-label">
            Name
          </span>
          <input className="input" type="text"/>
        </div>
        <div className="addItem-row">
          <span className="input-label">
            Quantity
          </span>
          <input className="input" type="text"/>
        </div>
        <div className="addItem-row">
          <span className="input-label">
            Description
          </span>
          <input className="input" type="text"/>
        </div>
      </div>
    );
  }

  renderCurrency = (currency) => {
    let value = "";

    const switchCase = key => {
      switch(key) {
        case "Platinum":
          value = "= 10 GP";
          break;
        case "Gold":
          value = "= 10 SP";
          break;
        case "Electrum":
          value = "= 5 SP";
          break;
        case "Silver":
          value = "= 10 CP";
          break;
        case "Copper":
          value = "";
          break;
        default:
          break;
      };
      return value;
    };

    return (
      Object.keys(currency).map(key => 
        (
          <div key={key} className="expandableItem-header currency">
            <div className="currency-icon">

            </div>
            <div className="currency-label">
              <div className="currency-label-primary">
                {key}
              </div>
              <div className="currency-label-secondary">
                {switchCase(key)}
              </div>
            </div>
            <div className="currency-input">
              {currency[key]}
            </div>
          </div>
        )
      )
    );
  }

  render() {
    const adversityMod = Math.floor((1-(this.state.remainingHealth/character.maximumHealth)) * 4);

    return (
      <div className="App">
        <div className="App-header">
          <Header 
            character={character} 
            remainingHealth={this.state.remainingHealth} 
            decreaseHealthHandler={this.decreaseHealthHandler} 
            increaseHealthHandler={this.increaseHealthHandler} 
            decreaseHealthBy10Handler={this.decreaseHealthBy10Handler} 
            increaseHealthBy10Handler={this.increaseHealthBy10Handler}/>
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
                  <div className="inventory-panel">
                    <div className="inventory-tabs">
                      <div 
                         className={"inventory-tabs-items " + (this.state.currencyTabActive ? "":"active") }
                         onClick={() => {this.setState({currencyTabActive: false})}}>
                        Items
                      </div>
                      <div 
                         className={"inventory-tabs-currency " + (this.state.currencyTabActive ? "active":"") }
                         onClick={() => {this.setState({currencyTabActive: true})}}>
                        Currency
                      </div>
                    </div>
                    {!this.state.currencyTabActive ? 
                      this.renderInventory(this.state.inventory) : this.renderCurrency(this.state.currency)}
                  </div>
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