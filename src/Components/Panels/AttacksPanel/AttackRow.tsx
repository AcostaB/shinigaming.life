import React, {SFC} from 'react';
import "./Attack.css";
import {Attack} from "../../../Models/Attacks";

interface IProps {
    attack: Attack,
    adversityMod: number
}

export const AttackRow: SFC<IProps> = ({attack, adversityMod}) => 
    <div className="attack">
        <div className={attack.melee ? "attack-melee-icon" : "attack-ranged-icon"}/>
        <div className="attack-weapon">
            <div className={"attack-weapon-name " + (attack.magicItem ? "magicItem":"")}>
                <span>{attack.name}</span>
                <span className="attack-weapon-proficiencyIndicator"/>
            </div>
            <div className="attack-weapon-type">
                {attack.type}
            </div>
        </div>
        <div className="attack-stats">
            <div className="attack-toHit">
                <div className="attack-toHit-label"> TO HIT </div>
                <div className={"attack-toHit-mod " + (adversityMod > 0 ? "adversity" : "")}> 
                    +{attack.toHitMod + adversityMod} 
                </div>
            </div>
            <div className="attack-damage">
                <div className="attack-damage-label"> DMG</div>
                <div className="attack-damage-dice"> 
                    {attack.damage}
                    <span className={"attack-damage-mod " + (adversityMod > 0 ? "adversity" : "")}>
                        +{attack.damageMod + adversityMod} 
                    </span>
                </div>
            </div>
        </div>
    </div>;