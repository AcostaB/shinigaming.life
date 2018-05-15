import React from 'react';
import {abilities} from "../Models/Abilities";
import {attacks} from "../Models/Attacks.js";
import {character} from '../Models/Character.js';
import {currency} from '../Models/Currency.js';
import {items} from '../Models/Items.js';
import {leftColumnSkills, rightColumnSkills} from "../Models/Skills.js";
import {limitedUses} from "../Models/LimitedUses.js";
import {passives} from "../Models/Passives.js";
import {Header} from '../Components/Header/Header.js';
import "./Dashboard.css";

import {AbilitiesPanel} from "../Components/Panels/AbilitiesPanel/AbilitiesPanel.js";
import {AttacksPanel} from "../Components/Panels/AttacksPanel/AttacksPanel.js";
import InventoryPanel from "../Components/Panels/InventoryPanel/InventoryPanel.js";
import {LimitedUsesPanel} from "../Components/Panels/LimitedUsesPanel/LimitedUsesPanel.js";
import {PassivesPanel} from "../Components/Panels/PassivesPanel/PassivesPanel.js";
import {SkillsPanel} from "../Components/Panels/SkillsPanel/SkillsPanel.js";
// import { api } from "../API/requests";
import {Item} from "../Models/Items";
import {Currency} from "../Models/Currency";

interface Props {

}

interface State {
  remainingHealth: number, 
  remainingUses: {[limitedUsesName: string]: string},
  currencyTabActive: boolean,
  currency: Currency,
  addNewItemExpanded: boolean
}

export class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const newRemainingUses = limitedUses.reduce( (accumulator, currentValue) => { 
      accumulator[currentValue.id] = currentValue.maxUses; 
      return accumulator;
    }, {});
    this.state = {
      remainingHealth: character.maximumHealth, 
      remainingUses: newRemainingUses,
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

    // this.setState(() => ({items: items}));
  }

  decreaseHealthHandler = () => {
    this.setState((prevState, props) => {
        if (prevState.remainingHealth !== 0) {
            return {remainingHealth: prevState.remainingHealth - 1};
        } else {
          return 
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

  render() {
    const adversityMod = Math.floor((1-(this.state.remainingHealth/character.maximumHealth)) * 4);

    return (
      <div className="App">
        <div className="App-header">
          <div className="App-header-content">
            <Header 
              character={character} 
              remainingHealth={this.state.remainingHealth} 
              decreaseHealthHandler={this.decreaseHealthHandler} 
              increaseHealthHandler={this.increaseHealthHandler} 
              decreaseHealthBy10Handler={this.decreaseHealthBy10Handler} 
              increaseHealthBy10Handler={this.increaseHealthBy10Handler}/>
          </div>
        </div>
        <div className="App-body">
          <div className="App-body-content">
            <div className="dashboard">
              <div className="dashboard-panel">
                <AbilitiesPanel 
                  abilities={abilities}
                  />
              </div>
              <div className="dashboard-panel">
                <SkillsPanel leftColumnSkills={leftColumnSkills} rightColumnSkills={rightColumnSkills}/>
              </div>
              <div className="dashboard-panel">
                <LimitedUsesPanel 
                  limitedUses={limitedUses}
                  remainingUses={this.state.remainingUses}
                  onShortRest={this.handleShortRest}
                  onLongRest={this.handleLongRest}
                  onLimitedUseDecrease={this.handleLimitedUseDecrease}
                  onLimitedUseIncrease={this.handleLimitedUseIncrease}
                  />          
              </div>
              <div className="dashboard-panel">
                <PassivesPanel passives={passives}/>
              </div>
              <div className="dashboard-panel">
                <AttacksPanel attacks={attacks} adversityMod={adversityMod}/>
              </div>
              <div className="dashboard-panel">
                <InventoryPanel 
                  items={items}
                  currency={currency}
                  /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}