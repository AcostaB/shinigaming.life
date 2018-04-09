import React from 'react';
import {Panel} from "../../Generic/Panel/Panel.js";
import {ExpandableItem} from "../../Generic/ExpandableItem/ExpandableItem.js";
import "./Passive.css";

export function PassivesPanel(props) {
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