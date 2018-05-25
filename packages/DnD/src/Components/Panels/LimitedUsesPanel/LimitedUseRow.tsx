import React from 'react';
import {ExpandableItem} from '../../Generic/ExpandableItem/ExpandableItem';
import {SpellDetails} from './SpellDetails';
import "./LimitedUse.css";
import {LimitedUseAbility, Spell} from "../../../Models/LimitedUses";

interface Props {
    limitedUse: LimitedUseAbility | Spell,
    isSpell: boolean,
    spell: Spell,
    remainingUses: number,
    handleDecrease: any,
    handleIncrease: any
}

export class LimitedUseRow extends React.Component<Props, {}> {
    renderLimitedUseHeader = (props: Props) => {
        return (
            <div className="limitedUse">
                <div className="limitedUse-main">
                    <div className="limitedUse-label">
                        <span className="limitedUse-name">
                            {props.limitedUse.name}
                        </span>
                        <span className="limitedUse-level">
                            {"(lv. " +props.limitedUse.level + ')'}
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
            </div>
        );
    };

    renderLimitedUseBody = (props: Props) => {
        if (props.isSpell) {
            return <SpellDetails spell={props.spell}/>
        } else {
            return <SpellDetails spell={props.limitedUse as Spell}/>
        }
    };

    render() {
        return (
            <ExpandableItem expandableItemHeader={this.renderLimitedUseHeader(this.props)} expandableItemBody={this.renderLimitedUseBody(this.props)}/>
        );
    };
}  