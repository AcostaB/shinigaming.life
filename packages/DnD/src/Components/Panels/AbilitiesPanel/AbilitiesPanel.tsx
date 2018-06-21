import React, {SFC} from 'react';
import { Panel } from "../../Generic/Panel/Panel";
import { AbilityRow } from "./AbilityRow";
import { Ability } from "../../../Models/Abilities";
import {connect} from "react-redux";
import {MappedState, IAppStore} from "../../../Types/Types";
import {map} from "lodash";

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

// TOD fix this any
const mapStateToProps = (state: IAppStore): MappedState<IProps> => ({
    abilities: map(state.abilities, value => value)
})

// TODO need to better understand why this is necessary. 
const AbilitiesPanel = connect<{}, {}, IProps>(
    mapStateToProps
)(AbilitiesPanelBase)

export default AbilitiesPanel;