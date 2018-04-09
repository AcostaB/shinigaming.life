import React from 'react';
import {Panel} from "../../Generic/Panel/Panel.js";
import {Ability} from "./Ability.js";

export function AbilitiesPanel(props) {
    return (
        <Panel>
            <Panel.Header title="ABILITIES"/>
            <Panel.Body>
                <table>
                    <tbody>
                        {props.abilities.map(item => <Ability key={item.name} ability={item}/>)}
                    </tbody>
                </table>
            </Panel.Body>
        </Panel>
    );
};