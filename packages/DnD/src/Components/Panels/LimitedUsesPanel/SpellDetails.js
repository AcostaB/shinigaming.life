import React from 'react';

export class SpellDetails extends React.Component {

    renderSpellDetail(detailName, detailData) {
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
        const {level, castingTime, rangeAndArea, duration, school, attackAndSave, damageAndEffect, description} = this.props.spell;

        return (
            <div className="spell-details">
                {this.renderSpellDetail("LEVEL", level)}
                {this.renderSpellDetail("CASTING TIME", castingTime)}
                {this.renderSpellDetail("RANGE/AREA", rangeAndArea)}
                {this.renderSpellDetail("DURATION", duration)}
                {this.renderSpellDetail("SCHOOL", school)}
                {this.renderSpellDetail("ATTACK/SAVE", attackAndSave)}
                {this.renderSpellDetail("DAMAGE/EFFECT", damageAndEffect)}

                <div className="spellLine"/>

                <div>
                    {description}
                </div>
            </div>
        );
    }
}