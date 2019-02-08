import React, { SFC } from "react";
import { Panel } from "../../ui-toolkit/Panel/Panel";
import { ExpandableItem } from "../../ui-toolkit/ExpandableItem/ExpandableItem";
import { Passive } from "../../../Models/Passives";
import { connect } from "react-redux";
import { MappedState, IAppStore } from "../../../Types/Types";
import { map } from "lodash";
import styled from "styled-components/macro";

interface IProps {
  passives: Passive[];
}

const PassivesPanelBase: SFC<IProps> = ({ passives }) => (
  <Panel>
    <Panel.Header title="PASSIVES" />
    <Panel.Body>
      {passives.map(passive => (
        <ExpandableItem
          key={passive.id}
          expandableItemHeader={
            <PassiveName>{passive.name}</PassiveName>
          }
          expandableItemBody={passive.description}
        />
      ))}
    </Panel.Body>
  </Panel>
);

const mapStateToProps = (state: IAppStore): MappedState<IProps> => ({
  passives: map(state.passives, value => value)
});

const PassivesPanel = connect(mapStateToProps)(PassivesPanelBase);

export default PassivesPanel;

const PassiveName = styled.span`
  font-size: 15px;
  font-weight: bold;
  font-family: Roboto,Helvetica,sans-serif;
  line-height: 1.1;
`;