import React, {SFC} from 'react';
import Spell from "../../../Models/Spell";
import "./Spell.css";

interface IProps {
    spell: Spell
}

export const SpellDetails: SFC<IProps> = ({spell}) => {

    const {level, castingTime, rangeAndArea, duration, school, attackAndSave, damageAndEffect, description} = spell;
    
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