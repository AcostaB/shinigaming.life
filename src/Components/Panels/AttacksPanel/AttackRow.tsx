import React, { SFC } from 'react';
import { Attack } from "../../../Models/Attacks";
import styled from 'styled-components/macro';
import {css} from 'styled-components';
import ExpandableHeaderPNG from "../../../Assets/expandable-header.png";

interface IProps {
    attack: Attack,
    adversityMod: number
}

export const AttackRow: SFC<IProps> = ({ attack, adversityMod }) =>
    <StyledAttack>
        <AttackIcon isMelee={attack.melee} />
        <Weapon>
            <WeaponName isMagicItem={attack.magicItem}>
                <span>{attack.name}</span>
            </WeaponName>
            <WeaponType>
                {attack.type}
            </WeaponType>
        </Weapon>
        <Stats>
            <div>
                <Label>TO HIT</Label>
                <Modifier hasAdversity={adversityMod > 0}>
                    +{attack.toHitMod + adversityMod}
                </Modifier>
            </div>
            <div>
                <Label>DMG</Label>
                <DamageDice>
                    {attack.damage}
                    <Modifier hasAdversity={adversityMod > 0}>
                        +{attack.damageMod + adversityMod}
                    </Modifier>
                </DamageDice>
            </div>
        </Stats>
    </StyledAttack>
    ;

const StyledAttack = styled.div`
    display: flex;
    align-items: center;
    background-image: url(${ExpandableHeaderPNG});
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

const AttackIcon = styled.div`
    background: center center transparent url("../../../Assets/${(props: {isMelee: boolean}) => props.isMelee ? 'melee' : 'ranged'}_weapon.svg") no-repeat;
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
    ${(props: {isMagicItem:boolean}) => props.isMagicItem ? 'color:#1FC219' : ''} 
`;

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

const Label = styled.div`
    font-size: 10px;
    text-transform: uppercase;
    margin-bottom: 3px;
`;

const sharedStyle1 = css`
    font-size: 15px;
    font-family: Roboto, Helvetica, sans-serif;
`;

const Modifier = styled.span`
    ${sharedStyle1};
    ${(props: {hasAdversity: boolean}) => props.hasAdversity ? 'color:orange' : ''} 
`;

const DamageDice = styled.span`
    ${sharedStyle1}
`;