import React from "react";
import Header from "../Components/Header/Header";
import "./Dashboard.css";

import AbilitiesPanel from "../Components/Panels/AbilitiesPanel/AbilitiesPanel";
import AttacksPanel from "../Components/Panels/AttacksPanel/AttacksPanel";
import InventoryPanel from "../Components/Panels/InventoryPanel/InventoryPanel";
import LimitedUsesPanel from "../Components/Panels/LimitedUsesPanel/LimitedUsesPanel";
import PassivesPanel from "../Components/Panels/PassivesPanel/PassivesPanel";
import SkillsPanel from "../Components/Panels/SkillsPanel/SkillsPanel";

import BodyBackground from "../Assets/body-background.jpg";
import HeaderBackground from "../Assets/header-background.png";

import styled from "styled-components";
import { Currency } from "../Models/Currency";

interface IState {
  remainingHealth: number;
  remainingLimitedUses: { [limitedUsesName: string]: number };
  currencyTabActive: boolean;
  currency: Currency;
  addNewItemExpanded: boolean;
}

// TODO need to fix this any
export class Dashboard extends React.Component<{}, IState> {
  render(): any {
    return (
      <DnD>
        <DnDHeader>
          <HeaderContent>
            <Header />
          </HeaderContent>
        </DnDHeader>
        <DnDBody>
          <BodyContent>
            {/* TODO clean this css up with styled components or something. */}
            <Panel>
              <AbilitiesPanel />
            </Panel>
            <Panel>
              <SkillsPanel />
            </Panel>
            <Panel>
              <LimitedUsesPanel />
            </Panel>
            <Panel>
              <PassivesPanel />
            </Panel>
            <Panel>
              <AttacksPanel />
            </Panel>
            <Panel>
              <InventoryPanel />
            </Panel>
          </BodyContent>
        </DnDBody>
      </DnD>
    );
  }
}

const DnD = styled.div`
   {
    background-image: url(${BodyBackground});
    background-position-x: center, initial;
    background-position-y: 120px;
    background-size: initial, initial;
    background-repeat: no-repeat, initial;
    background-attachment: initial, initial;
    background-origin: initial, initial;
    background-clip: initial, initial;
    background-color: rgb(249, 249, 249);
    height: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
  }
`;

const DnDHeader = styled.div`
  background: url(${HeaderBackground});
  background-position-y: -238px;
`;

// TODO: the next two share properties. Need to figure out how to share them so I dont repeat.
const HeaderContent = styled.div`
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 50px;
  padding-right: 50px;
`;

const BodyContent = styled.div`
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

// Example of media query.
const DnDBody = styled.div`
  margin: 20px auto;

  @media (max-width: 800px) {
    padding: 20px 10px 0 20px !important;
  }
`;

const Panel = styled.div`
  width: 33%;
  display: inline-block;
  padding: 0 5px 15px 5px;
  box-sizing: border-box;
`;
