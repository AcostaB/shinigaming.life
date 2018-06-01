import React from 'react';
import "./Attack.css";
import {Attack} from "../../../Models/Attacks";

interface IProps {
    attack: Attack,
    adversityMod: number
}

export const AttackRow  = (props: IProps) => {
    return (
        <div className="attack">
            <div className={props.attack.melee ? "attack-melee-icon" : "attack-ranged-icon"}/>
            <div className="attack-weapon">
                <div className={"attack-weapon-name " + (props.attack.magicItem ? "magicItem":"")}>
                    <span>{props.attack.name}</span>
                    <span className="attack-weapon-proficiencyIndicator"/>
                </div>
                <div className="attack-weapon-type">
                    {props.attack.type}
                </div>
            </div>
            <div className="attack-stats">
                <div className="attack-toHit">
                    <div className="attack-toHit-label"> TO HIT </div>
                    <div className={"attack-toHit-mod " + (props.adversityMod > 0 ? "adversity" : "")}> 
                        +{props.attack.toHitMod + props.adversityMod} 
                    </div>
                </div>
                <div className="attack-damage">
                    <div className="attack-damage-label"> DMG</div>
                    <div className="attack-damage-dice"> 
                        {props.attack.damage}
                        <span className={"attack-damage-mod " + (props.adversityMod > 0 ? "adversity" : "")}>
                            +{props.attack.damageMod + props.adversityMod} 
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

