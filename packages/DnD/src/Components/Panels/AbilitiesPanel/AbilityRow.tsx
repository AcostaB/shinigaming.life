import React, {SFC} from 'react';
import "./Ability.css";
import { Ability } from '../../../Models/Abilities';

interface IProps {
    ability: Ability
}

export const AbilityRow: SFC<IProps> = ({ability}) => {
    let iconClass: string = "ability-icon " + ability.name.toLowerCase();
    let modSign: string = ability.mod >= 0 ? "+" : "-";
    let saveSign: string = ability.save >= 0 ? "+" : "-";
    
    return (
        <tr className="ability">
            <td className="ability-cell">
                <span className={iconClass}/>
            </td>
            <td className="ability-cell ability-exp">
                {ability.exp}
            </td>
            <td className="ability-cell ability-name">
                {ability.name}
            </td>
            <td className="ability-cell mod-cell">
                <span className="ability-mod-label-text">
                    Mod
                </span>
                <span>
                    {modSign}
                </span>
                <span className="ability-mod">
                    {Math.abs(ability.mod)}
                </span>
            </td>               
            <td className="ability-cell save-cell">
                <span className="ability-save-label-text">
                    Save
                </span>
                <span>
                    {saveSign}
                </span>
                <span className="ability-save">
                    {Math.abs(ability.save)}
                </span>
            </td>                
            <td className="ability-cell">
                <span className={ability.isProficient ? "ability-proficiency-indicator" : ""}/>                    
            </td>
        </tr>
    );   
}