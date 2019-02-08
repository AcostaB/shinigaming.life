import React, { SFC } from 'react';
import "./Attack.css";
import { Attack } from "../../../Models/Attacks";
import styled from 'styled-components/macro';

interface IProps {
    attack: Attack,
    adversityMod: number
}

export const AttackRow: SFC<IProps> = ({ attack, adversityMod }) =>
    <StyledAttack>
        <div className={attack.melee ? "attack-melee-icon" : "attack-ranged-icon"} />
        <Weapon>
            <div className={"attack-weapon-name " + (attack.magicItem ? "magicItem" : "")}>
                <span>{attack.name}</span>
                {/* TODO STYLE?! */}
                <span className="attack-weapon-proficiencyIndicator" />
            </div>
            <WeaponType>
                {attack.type}
            </WeaponType>
        </Weapon>
        <Stats>
            <div className="attack-toHit">
                <div className="attack-toHit-label"> TO HIT </div>
                <div className={"attack-toHit-mod " + (adversityMod > 0 ? "adversity" : "")}>
                    +{attack.toHitMod + adversityMod}
                </div>
            </div>
            <div>
                <div className="attack-damage-label"> DMG</div>
                <div className="attack-damage-dice">
                    {attack.damage}
                    <span className={"attack-damage-mod " + (adversityMod > 0 ? "adversity" : "")}>
                        +{attack.damageMod + adversityMod}
                    </span>
                </div>
            </div>
        </Stats>
    </StyledAttack>
    ;

const StyledAttack = styled.div`
    display: flex;
    align-items: center;
    background-image: url("../../../Assets/expandable-header.png");
    z-index: 2;
    height: 65px;
    background-size: 100% 65px;
    display: flex;
    margin: 5px 5px 5px 5px;
    -webkit-align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    text-align: left;
`;

const MeleeIcon = styled.div`
    background: center center transparent url("../../../Assets/melee_weapon.svg") no-repeat;
    width: 32px;
    height: 32px;
    background-size: 28px 28px;
`;

const RangedIcon = styled.div`
    background: center center transparent url("../../../Assets/ranged_weapon.svg") no-repeat;
    width: 32px;
    height: 32px;
    background-size: 28px 28px;
`;

const Weapon = styled.div`
    flex: 1;
`;

const WeaponName = styled.div`
    font-size: 15px;
    font-weight: bold;
    font-family: Roboto, Helvetica, sans-serif;
    line-height: 1.1;
`;

const weapon-name.magicItem {
    color: #1FC219;
}

const WeaponType = styled.div`
    color: #979aa4;
    font-size: 10px;
    font-family: Roboto, Helvetica, sans-serif;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 1;
    margin-top: 3px;
`;

const Stats = styled.div`
    display: flex;
    text-align: center;
`;

const toHit-label,
const damage-label {
    font - size: 10px;
    text - transform: uppercase;
    margin - bottom: 3px;
}

const toHit-mod,
const damage-mod,
const damage-dice {
    font - size: 15px;
    font - family: Roboto, Helvetica, sans - serif;
}

const toHit-mod.adversity,
const damage-mod.adversity {
    color: orange;
}