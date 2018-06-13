import React, {SFC} from 'react';
import { Panel } from "../../Generic/Panel/Panel";
import { AbilityRow } from "./AbilityRow";
import { Ability } from "../../../Models/Abilities";
import {connect} from "react-redux";

interface IProps {
    abilities: Ability[]
}

const AbilitiesPanelBase: SFC<IProps> = ({abilities}) => 
    <Panel>
        <Panel.Header title="ABILITIES"/>
        <Panel.Body>
            <table>
                <tbody>
                    {abilities.map(item => <AbilityRow key={item.name} ability={item}/>)}
                </tbody>
            </table>
        </Panel.Body>
    </Panel>;

const mapStateToProps = (state: any): IProps => ({
    abilities: state.abilitiesPanel.abilities
})

const AbilitiesPanel = connect(
    mapStateToProps
)(AbilitiesPanelBase)

export default AbilitiesPanel;