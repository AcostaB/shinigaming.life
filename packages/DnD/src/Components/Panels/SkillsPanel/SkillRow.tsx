import React from 'react';
import "./Skill.css";
import {Skill} from "../../../Models/Skills";

interface Props {
    skill: Skill
}

export class SkillRow extends React.Component<Props, {}> {
    modSign: string;

    constructor(props: Props) {
        super(props);
        this.props = props;
        this.modSign = props.skill.mod >= 0 ? "+" : "-";
    }

    render() {
        return (
            <div className="skill-item">
                <span className="skill-item-ability">
                    ({this.props.skill.abilityName})
                </span>
                <span className="skill-item-name">
                    <span>
                        {this.props.skill.skillName}
                    </span>
                    <span className={this.props.skill.isProficient ? "skill-item-proficiency" : ""}>
                    </span>
                </span>
                <span className="skill-item-mod-cell">
                    <span className="skill-item-mod-sign">
                        {this.modSign}
                    </span>
                    <span className="skill-item-mod">
                        {Math.abs(this.props.skill.mod)}
                    </span>
                </span>
            </div>
        );
    }
}