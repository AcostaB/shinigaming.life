import React from 'react';
import Header from '../Components/Header/Header';
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-header-content">
            <Header/>
          </div>
        </div>
        <div className="App-body">
          <div className="App-body-content">
            <div className="dashboard">
              <div className="dashboard-panel">
                <AbilitiesPanel/>
              </div>
              <div className="dashboard-panel">
                <SkillsPanel/>
              </div>
              <div className="dashboard-panel">
                <LimitedUsesPanel/>          
              </div>
              <div className="dashboard-panel">
                <PassivesPanel/>
              </div>
              <div className="dashboard-panel">
                <AttacksPanel/>
              </div>
              <div className="dashboard-panel">
                <InventoryPanel/> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}