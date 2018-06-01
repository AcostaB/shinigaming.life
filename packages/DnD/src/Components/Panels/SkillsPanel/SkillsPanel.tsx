import React from 'react';
import {Panel} from "../../Generic/Panel/Panel";
import {SkillRow} from "./SkillRow";
import {Skill} from "../../../Models/Skills";

interface IProps {
    leftColumnSkills: Skill[],
    rightColumnSkills: Skill[]
}

export function SkillsPanel(props: IProps) {
    return (
        <Panel>
            <Panel.Header title="SKILLS"/>
            <Panel.Body>
                <div className="panel-content-columns">
                    <div className="panel-content-column skill-column">
                        {props.leftColumnSkills.map(skill => <SkillRow key={skill.skillName} skill={skill}/>) } 
                    </div>
                    <div className="panel-content-column skill-column">
                        {props.rightColumnSkills.map(skill => <SkillRow key={skill.skillName} skill={skill}/>) } 
                    </div>
                </div>
            </Panel.Body>
        </Panel>
    );
};