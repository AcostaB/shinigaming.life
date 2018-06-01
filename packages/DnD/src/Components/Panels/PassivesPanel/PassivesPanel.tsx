import React from 'react';
import {Panel} from "../../Generic/Panel/Panel";
import {ExpandableItem} from "../../Generic/ExpandableItem/ExpandableItem";
import {Passive} from "../../../Models/Passives";
import "./Passive.css";

interface IProps {
    passives: Passive[]
}

export function PassivesPanel(props: IProps) {
    return (
        <Panel>
            <Panel.Header title="PASSIVES"/>
            <Panel.Body>
                {props.passives.map(passive => 
                    <ExpandableItem 
                        key={passive.id} 
                        expandableItemHeader={
                            <span className="passive-name">
                                {passive.name}
                            </span>
                        } 
                        expandableItemBody={passive.description}
                    />
                )}
            </Panel.Body>
        </Panel>
    );
};