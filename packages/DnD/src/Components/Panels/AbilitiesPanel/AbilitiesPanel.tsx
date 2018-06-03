import React, {SFC} from 'react';
import { Panel } from "../../Generic/Panel/Panel";
import { AbilityRow } from "./AbilityRow";
import { Ability } from "../../../Models/Abilities";

interface IProps {
    abilities: Ability[]
}

export const AbilitiesPanel: SFC<IProps> = ({abilities}) => 
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