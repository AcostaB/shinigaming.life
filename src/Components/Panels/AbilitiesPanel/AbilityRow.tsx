import React, { SFC } from 'react';
import { Ability } from '../../../Models/Abilities';
import styled from 'styled-components/macro';
import strength from '../../../Assets/strength.svg';
import dexterity from '../../../Assets/dexterity.svg';
import charisma from '../../../Assets/charisma.svg';
import constitution from '../../../Assets/constitution.svg';
import intelligence from '../../../Assets/intelligence.svg';
import wisdom from '../../../Assets/wisdom.svg';

interface Props {
    ability: Ability
}

export const AbilityRow: SFC<Props> = ({ ability }) => {
    let modSign: string = ability.mod >= 0 ? "+" : "-";
    let saveSign: string = ability.save >= 0 ? "+" : "-";

    return (
        <StyledAbility>
            <Cell>
                <AbilityIcon abilityName={ability.name.toLowerCase()} />
            </Cell>
            <ExpCell>
                {ability.exp}
            </ExpCell>
            <NameCell>
                {ability.name}
            </NameCell>
            <Cell>
                <StatContainer>
                    <AbilityStatLabelText>
                        Mod
                </AbilityStatLabelText>
                    <AbilityStatSign>
                        {modSign}
                    </AbilityStatSign>
                    <AbilityStat>
                        {Math.abs(ability.mod)}
                    </AbilityStat>
                </StatContainer>
            </Cell>
            <Cell>
                <StatContainer>
                    <AbilityStatLabelText>
                        Save
                </AbilityStatLabelText>
                    <AbilityStatSign>
                        {saveSign}
                    </AbilityStatSign>
                    <AbilityStat>
                        {Math.abs(ability.save)}
                    </AbilityStat>
                </StatContainer>
            </Cell>
            <Cell>
                <AbilityProficiencyIndicator isProficient={ability.isProficient} />
            </Cell>
        </StyledAbility>
    );
};

const StyledAbility = styled.tr`
    width: 100%;
`;

const Cell = styled.td`
    border-bottom: 1px solid #edeae8;
    padding: 8px 2px;
    vertical-align: middle;
    font-family: "Roboto Condensed",Roboto,Helvetica,sans-serif;
`;

const ExpCell = styled(Cell)`
    text-align: right;
    font-size: 16px;
    font-weight: normal;
`;

const NameCell = styled(Cell)`
    text-align: left;
    font-size: 16px;
    font-weight: normal;
    width: 100%;
`;

const StatContainer = styled.div`
    width: 55px;

    & > span {
        vertical-align: middle;
        display: inline-block;
    } 
`;

const AbilityStatLabelText = styled.span`
    width: 20px;
    font-size: 10px;
    text-transform: uppercase;
    padding-right: 6px;
`;

const AbilityStatSign = styled.span`
    width: 10px;
`;

const AbilityStat = styled.span`
    width: 10px;
    font-size: 20px;
    text-align: right;
`;

const AbilityProficiencyIndicator = styled.span`
    ${(props: { isProficient: boolean }) => props.isProficient ?
        `
    vertical-align: middle;
    width: 5px;
    height: 5px;
    background-color: #96bf6b;
    border-radius: 50%;
    ` : ''}
`;


const AbilityIcon = styled.span`
    width: 18px;
    height: 18px;
    display: inline-block;
    vertical-align: middle;
    background-size: 20px;
    
    background: center center transparent url(${(props: { abilityName: string }) => getIconURL(props.abilityName)}) no-repeat;
`;

const getIconURL = (abilityName: string) => {
    switch (abilityName) {
        case "strength":
            return strength;
        case "dexterity":
            return dexterity;
        case "constitution":
            return constitution;
        case "wisdom":
            return wisdom;
        case "intelligence":
            return intelligence;
        case "charisma":
            return charisma;
        default: return strength;
    }
}