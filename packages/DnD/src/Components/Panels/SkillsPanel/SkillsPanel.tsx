import React from 'react';
import {Panel} from "../../Generic/Panel/Panel.js";
import {Skill} from "./Skill.js"

export function SkillsPanel(props) {
    return (
        <Panel>
            <Panel.Header title="SKILLS"/>
            <Panel.Body>
                <div className="panel-content-columns">
                    <div className="panel-content-column skill-column">
                        {props.leftColumnSkills.map(skill => <Skill key={skill.skillName} skill={skill}/>) } 
                    </div>
                    <div className="panel-content-column skill-column">
                        {props.rightColumnSkills.map(skill => <Skill key={skill.skillName} skill={skill}/>) } 
                    </div>
                </div>
            </Panel.Body>
        </Panel>
    );
};