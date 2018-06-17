import React from 'react';
import {abilities} from "../Models/Abilities";
import {attacks} from "../Models/Attacks";
import {character} from '../Models/Character';
import {currency} from '../Models/Currency';
import {items} from '../Models/Items';
import {leftColumnSkills, rightColumnSkills} from "../Models/Skills";
import {limitedUses} from "../Models/LimitedUses";
import {passives} from "../Models/Passives";
import {Header} from '../Components/Header/Header';
import "./Dashboard.css";

import AbilitiesPanel from "../Components/Panels/AbilitiesPanel/AbilitiesPanel";
import AttacksPanel from "../Components/Panels/AttacksPanel/AttacksPanel";
import InventoryPanel from "../Components/Panels/InventoryPanel/InventoryPanel";
import LimitedUsesPanel from "../Components/Panels/LimitedUsesPanel/LimitedUsesPanel";
import PassivesPanel from "../Components/Panels/PassivesPanel/PassivesPanel";
import SkillsPanel from "../Components/Panels/SkillsPanel/SkillsPanel";
// import { api } from "../API/requests";

import {Currency} from "../Models/Currency";

interface IState {
  remainingHealth: number, 
  remainingUses: {[limitedUsesName: string]: number},
  currencyTabActive: boolean,
  currency: Currency,
  addNewItemExpanded: boolean
}

export class Dashboard extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    const newRemainingUses = limitedUses.reduce( (accumulator, currentValue) => { 
      accumulator[currentValue.id] = currentValue.maxUses; 
      return accumulator;
    }, {});

    this.state = {
      remainingHealth: character.maximumHealth, 
      remainingUses: newRemainingUses,
      currencyTabActive: false,
      currency,
      addNewItemExpanded: true
    }
  }

  // componentDidMount() {
    // api.getAllItems().then(res => {
    //   console.log("Request to fetch all items finished.");
    //   console.log(res);
    //   this.setState(() => ({inventory: res.data}));
    // });

    // this.setState(() => ({items: items}));
  // }

  decreaseHealthHandler = () => {
    this.setState((prevState, props) => {
        if (prevState.remainingHealth !== 0) {
            return {...prevState, remainingHealth: prevState.remainingHealth - 1};
        } else {
          return; 
        }
    })
  }

  increaseHealthHandler = () => {
      this.setState((prevState, props) => {
          if (prevState.remainingHealth < character.maximumHealth) {
              return {...prevState, remainingHealth: prevState.remainingHealth + 1};
          } else {
            return; 
          }
      })
  }

  decreaseHealthBy10Handler = () => {
    this.setState((prevState, props) => {
      if (prevState.remainingHealth - 10 >= 0) {
          return {...prevState, remainingHealth: prevState.remainingHealth - 10};
      } else {
        return {remainingHealth: 0};
      }
    })
  }

  increaseHealthBy10Handler = () => {
    this.setState((prevState, props) => {
      if (prevState.remainingHealth + 10 <= character.maximumHealth) {
          return {...prevState, remainingHealth: prevState.remainingHealth + 10};
      } else {
        return {...prevState, remainingHealth: character.maximumHealth};
      }
    });
  }

  handleItemDecrease = (id: number) => {
    // this.setState((prevState, props) => { 
    //   // TODO this is bad. Rewrite. 
    //   const newValue = prevState.remainingUses[id] > 0 ? prevState.remainingUses[id] - 1 : 0;
    //   return {remainingUses: {...prevState.remainingUses, [id]: newValue}}
    // });
  };

  handleItemIncrease = (id: number) => {
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
                  // onShortRest={this.handleShortRest}
                  // onLongRest={this.handleLongRest}
                  // onLimitedUseDecrease={this.handleLimitedUseDecrease}
                  // onLimitedUseIncrease={this.handleLimitedUseIncrease}
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
                  handleItemIncrease={this.handleItemIncrease}
                  handleItemDecrease={this.handleItemDecrease}
                  /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}