import React, { SFC } from "react";
import { Panel } from "../../ui-toolkit/Panel/Panel";
import { SkillRow } from "./SkillRow";
import { Skill } from "../../../Models/Skills";
import { connect } from "react-redux";
import { MappedState, IAppStore } from "../../../Types/Types";
import { map } from "lodash";

interface IProps {
  leftColumnSkills: Skill[];
  rightColumnSkills: Skill[];
}

const SkillsPanelBase: SFC<IProps> = ({
  leftColumnSkills,
  rightColumnSkills
}) => (
  <Panel>
    <Panel.Header title="SKILLS" />
    <Panel.Body>
      <div className="panel-content-columns">
        <div className="panel-content-column skill-column">
          {leftColumnSkills.map(skill => (
            <SkillRow key={skill.skillName} skill={skill} />
          ))}
        </div>
        <div className="panel-content-column skill-column">
          {rightColumnSkills.map(skill => (
            <SkillRow key={skill.skillName} skill={skill} />
          ))}
        </div>
      </div>
    </Panel.Body>
  </Panel>
);

const mapStateToProps = (state: IAppStore): MappedState<IProps> => ({
  leftColumnSkills: map(state.leftColumnSkills, value => value),
  rightColumnSkills: map(state.rightColumnSkills, value => value)
});

const SkillsPanel = connect(mapStateToProps)(SkillsPanelBase);

export default SkillsPanel;
