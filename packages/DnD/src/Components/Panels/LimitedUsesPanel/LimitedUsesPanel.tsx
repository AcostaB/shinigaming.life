import React from 'react';
import {Panel} from "../../Generic/Panel/Panel.js";
import {LimitedUse} from "./LimitedUse.js";

export function LimitedUsesPanel(props) {
    return (
        <Panel>
            <Panel.Header title="LIMITED USES"/>
            <Panel.Body>
                <div className="rest-buttons">
                        <button className="shortRest" onClick={props.onShortRest}>SHORT REST</button>
                        <button className="longRest" onClick={props.onLongRest}>LONG REST</button>
                </div>
                {props.limitedUses.map(item => 
                    <LimitedUse 
                        key={item.id} 
                        limitedUse={item} 
                        remainingUses={props.remainingUses[item.id]}
                        handleDecrease={() => props.onLimitedUseDecrease(item.id)}
                        handleIncrease={() => props.onLimitedUseIncrease(item.id)}/>
                    )
                }
            </Panel.Body>
        </Panel>
    );
};