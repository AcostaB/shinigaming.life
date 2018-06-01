import React from 'react';
import "./Ability.css";
import { Ability } from '../../../Models/Abilities';

interface IProps {
    ability: Ability
}

export class AbilityRow extends React.Component<IProps, {}> {
    public iconClass: string;
    public modSign: string;
    public saveSign: string;
    
    constructor(props: IProps) {
        super(props);
        this.props = props;
        this.iconClass = "ability-icon " + this.props.ability.name.toLowerCase();
        this.modSign = this.props.ability.mod >= 0 ? "+" : "-";
        this.saveSign = this.props.ability.save >= 0 ? "+" : "-";
    }

    public render() {
        return (
            <tr className="ability">
                <td className="ability-cell">
                    <span className={this.iconClass}/>
                </td>
                <td className="ability-cell ability-exp">
                    {this.props.ability.exp}
                </td>
                <td className="ability-cell ability-name">
                    {this.props.ability.name}
                </td>
                <td className="ability-cell mod-cell">
                    <span className="ability-mod-label-text">
                        Mod
                    </span>
                    <span>
                        {this.modSign}
                    </span>
                    <span className="ability-mod">
                        {Math.abs(this.props.ability.mod)}
                    </span>
                </td>               
                <td className="ability-cell save-cell">
                    <span className="ability-save-label-text">
                        Save
                    </span>
                    <span>
                        {this.saveSign}
                    </span>
                    <span className="ability-save">
                        {Math.abs(this.props.ability.save)}
                    </span>
                </td>                
                <td className="ability-cell">
                    <span className={this.props.ability.isProficient ? "ability-proficiency-indicator" : ""}/>                    
                </td>
            </tr>
        );
    }
}