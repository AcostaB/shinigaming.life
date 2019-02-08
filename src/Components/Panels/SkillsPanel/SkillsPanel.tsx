import React, { SFC } from "react";
import { Panel } from "../../ui-toolkit/Panel/Panel";
import { SkillRow } from "./SkillRow";
import { Skill } from "../../../Models/Skills";
import { connect } from "react-redux";
import { MappedState, IAppStore } from "../../../Types/Types";
import { map } from "lodash";
import styled from 'styled-components/macro';

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
          <SkillsPanel_Content_Column className="skill-column">
            {leftColumnSkills.map(skill => (
              <SkillRow key={skill.skillName} skill={skill} />
            ))}
          </SkillsPanel_Content_Column>
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

// TODO need to make sure that the double element selector is working properly.
const SkillsPanel_Content_Column = styled.div`
  box-sizing: border-box;

  display: inline-block;

  &:first-child {
    padding-right: 10px;
  }

  &:not(:first-child) {
    border-left: 1px solid #edeae8;
  }

  &:not(:first-child),
  :not(:last-child) {
    padding-left: 10px;
    padding-right: 10px;
  }

  &:last-child {
    padding-left: 10px;
  }
`;
