import React from 'react';
import {Panel} from "../../Generic/Panel/Panel.js";
import {AttackRow} from "./AttackRow.js";
import {Attack} from "../../../Models/Attacks";

interface Props {
    attacks: Attack[],
    adversityMod: number
}

export function AttacksPanel(props: Props) {
    return (
        <Panel>
            <Panel.Header title="ATTACKS"/>
            <Panel.Body>
                <div>
                    <div className="attacks-perAction">
                        Attacks Per Action: 2
                    </div>
                    {props.attacks.map(attack => <AttackRow key={attack.name} attack={attack} adversityMod={props.adversityMod}/>)}
                </div>
            </Panel.Body>
        </Panel>
    );
};