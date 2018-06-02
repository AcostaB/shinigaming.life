import React from 'react';
import "./Spell.css";
import {Spell} from "../../../Models/LimitedUses";

interface IProps {
    spell: Spell
}

export const SpellDetails = (props: IProps): JSX.Element => {

    const renderSpellDetail = (detailName: string, detailData: string | number) => {
        return (
            <div className="spell-detail">
                <div className="spell-detail-name">
                    {detailName}
                </div>
                <div className="spell-detail-info">
                    {detailData}
                </div>    
            </div>
        );
    }

    render() {
        const {level, castingTime, rangeAndArea, duration, school, attackAndSave, damageAndEffect, description} = props.spell;

        return (
            <div className="spell-details">
                {renderSpellDetail("LEVEL", level)}
                {renderSpellDetail("CASTING TIME", castingTime)}
                {renderSpellDetail("RANGE/AREA", rangeAndArea)}
                {renderSpellDetail("DURATION", duration)}
                {renderSpellDetail("SCHOOL", school)}
                {renderSpellDetail("ATTACK/SAVE", attackAndSave)}
                {renderSpellDetail("DAMAGE/EFFECT", damageAndEffect)}

                <div className="spellLine"/>

                <div>
                    {description}
                </div>
            </div>
        );
    }
}