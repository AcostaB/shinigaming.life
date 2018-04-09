import React from 'react';
import {Panel} from "../../Generic/Panel/Panel.js";
import {Attack} from "./Attack.js";

export function AttacksPanel(props) {
    return (
        <Panel>
            <Panel.Header title="ATTACKS"/>
            <Panel.Body>
                <div className="attacks-perAction">
                    Attacks Per Action: 2
                </div>
                {props.attacks.map(attack => <Attack key={attack.name} attack={attack} adversityMod={props.adversityMod}/>)}
            </Panel.Body>
        </Panel>
    );
};