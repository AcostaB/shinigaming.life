import React, {SFC} from 'react';
import {Panel} from "../../Generic/Panel/Panel";
import {LimitedUseRow} from "./LimitedUseRow";
// import {LimitedUseAbility, Spell} from "../../../Models/LimitedUses";

interface IProps {
    remainingUses: { [limitedUsesName: string]: number; },
    onShortRest: () => void,
    onLongRest: () => void,
    onLimitedUseDecrease: (limitedUseId: number) => void,
    onLimitedUseIncrease: (limitedUseId: number) => void,
    limitedUses: any
}

export const LimitedUsesPanel: SFC<IProps> = (props) => 
    <Panel>
        <Panel.Header title="LIMITED USES"/>
        <Panel.Body>
            <div className="rest-buttons">
                    <button className="shortRest" onClick={props.onShortRest}>SHORT REST</button>
                    <button className="longRest" onClick={props.onLongRest}>LONG REST</button>
            </div>
            {props.limitedUses.map((limitedUse: any) => 
                <LimitedUseRow
                    key={limitedUse.id} 
                    spell={limitedUse.spell}
                    isSpell={limitedUse.isSpell} 
                    limitedUse={limitedUse} 
                    remainingUses={props.remainingUses[limitedUse.id]}
                    handleDecrease={props.onLimitedUseDecrease}
                    handleIncrease={props.onLimitedUseIncrease}/>
                )
            }
        </Panel.Body>
    </Panel>;