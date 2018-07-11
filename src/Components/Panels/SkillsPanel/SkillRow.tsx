import React, {SFC} from 'react';
import "./Skill.css";
import {Skill} from "../../../Models/Skills";

interface IProps {
    skill: Skill
}

export const SkillRow: SFC<IProps> = ({skill}) => {
    const modSign: string = skill.mod >= 0 ? "+" : "-";

    return (
        <div className="skill-item">
            <span className="skill-item-ability">
                ({skill.abilityName})
            </span>
            <span className="skill-item-name">
                <span>
                    {skill.skillName}
                </span>
                <span className={skill.isProficient ? "skill-item-proficiency" : ""}/>
            </span>
            <span className="skill-item-mod-cell">
                <span className="skill-item-mod-sign">
                    {modSign}
                </span>
                <span className="skill-item-mod">
                    {Math.abs(skill.mod)}
                </span>
            </span>
        </div>
    );
}