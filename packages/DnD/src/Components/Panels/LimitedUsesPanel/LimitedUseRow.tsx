import React, {SFC} from 'react';
import {ExpandableItem} from '../../Generic/ExpandableItem/ExpandableItem';
import {SpellDetails} from './SpellDetails';
import "./LimitedUse.css";
import {LimitedUseAbility} from "../../../Models/LimitedUses";
import Spell from "../../../Models/Spell";

interface IProps {
    limitedUse: LimitedUseAbility | Spell,
    isSpell: boolean,
    spell: Spell,
    remainingUses: number,
    handleDecrease: any,
    handleIncrease: any
}

export const LimitedUseRow: SFC<IProps> = (props) => {
    const renderLimitedUseHeader = () => 
        <div className="limitedUse">
            <div className="limitedUse-main">
                <div className="limitedUse-label">
                    <span className="limitedUse-name">
                        {props.limitedUse.name}
                    </span>
                    <span className="limitedUse-level">
                        {`(lv. ${props.limitedUse.level})`}
                    </span>
                </div>
                <div className="limitedUse-counter">
                    <button className="limitedUse-decrease-icon" onClick={props.handleDecrease}/>
                    <div className="limitedUse-uses">
                        <span>{props.remainingUses}</span>
                        <span>/</span>
                        <span>{props.limitedUse.maxUses}</span>
                    </div>
                    <button className="limitedUse-increase-icon" onClick={props.handleIncrease}/>
                </div>
            </div>
        </div>;

    const renderLimitedUseBody = () => 
        props.isSpell ? 
            <SpellDetails spell={props.spell}/>
            : <SpellDetails spell={props.limitedUse as Spell}/>;

    return (
        <ExpandableItem 
            expandableItemHeader={renderLimitedUseHeader()} 
            expandableItemBody={renderLimitedUseBody()}
        />
    );
}  