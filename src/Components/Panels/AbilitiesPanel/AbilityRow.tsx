import React, {SFC} from 'react';
import { Ability } from '../../../Models/Abilities';
import styled from 'styled-components/macro';

interface IProps {
    ability: Ability
}

export const AbilityRow: SFC<IProps> = ({ability}) => {
    let modSign: string = ability.mod >= 0 ? "+" : "-";
    let saveSign: string = ability.save >= 0 ? "+" : "-";
    
    return (
        <StyledAbility>
            <Cell>
                <AbilityIcon abilityName={ability.name.toLowerCase()}/>
            </Cell>
            <ExpCell>
                {ability.exp}
            </ExpCell>
            <NameCell>
                {ability.name}
            </NameCell>
            <Cell>
                <AbilityModLabelText>
                    Mod
                </AbilityModLabelText>
                <span>
                    {modSign}
                </span>
                <AbilityMod>
                    {Math.abs(ability.mod)}
                </AbilityMod>
            </Cell>               
            <Cell>
                <AbilitySaveLabelText>
                    Save
                </AbilitySaveLabelText>
                <span>
                    {saveSign}
                </span>
                <AbilitySave>
                    {Math.abs(ability.save)}
                </AbilitySave>
            </Cell>                
            <Cell>
                <AbilityProficiencyIndicator isProficient={ability.isProficient}/>                    
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
    font-size: 16px;
    font-weight: normal;
`;

const NameCell = styled(Cell)`
    text-align: left;
    font-size: 16px;
    font-weight: normal;
    width: 100%;
`;
  
const AbilityModLabelText = styled.span`
    display: inline-block;
    vertical-align: middle;
    font-size: 10px;
    text-transform: uppercase;
    padding-right: 6px;
`;
  
const AbilityMod = styled.span`
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
`;
  
const AbilitySaveLabelText = styled.span`
    display: inline-block;
    vertical-align: middle;
    font-size: 10px;
    text-transform: uppercase;
    padding-right: 6px;
`;
  
const AbilitySave = styled.span`
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
  `;
  
const AbilityProficiencyIndicator = styled.span`
    ${(props: {isProficient: boolean}) => props.isProficient ?
    `
    display: inline-block;
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
    background: center center transparent url("../../../Assets/${(props: {abilityName: string}) => props.abilityName}.svg") no-repeat;
`;