import React, { SFC } from "react";
import { Panel } from "../../ui-toolkit/Panel/Panel";
import { SkillRow } from "./SkillRow";
import { Skill } from "../../../Models/Skills";
import { connect } from "react-redux";
import { MappedState, IAppStore } from "../../../Types/Types";
import { map } from "lodash";
import styled from 'styled-components/macro';

interface Props {
  leftColumnSkills: Skill[];
  rightColumnSkills: Skill[];
}

const SkillsPanelBase: SFC<Props> = ({
  leftColumnSkills,
  rightColumnSkills
}) => (
    <Panel>
      <Panel.Header title="SKILLS" />
      <Panel.Body>
        <Columns>
          <Column>
            {leftColumnSkills.map(skill => (
              <SkillRow key={skill.skillName} skill={skill} />
            ))}
          </Column>
          <Column>
            {rightColumnSkills.map(skill => (
              <SkillRow key={skill.skillName} skill={skill} />
            ))}
          </Column>
        </Columns>
      </Panel.Body>
    </Panel>
  );

const mapStateToProps = (state: IAppStore): MappedState<Props> => ({
  leftColumnSkills: map(state.leftColumnSkills, value => value),
  rightColumnSkills: map(state.rightColumnSkills, value => value)
});

const SkillsPanel = connect(mapStateToProps)(SkillsPanelBase);

export default SkillsPanel;

const Column = styled.div`
    width: 50%;
    display: inline-block;
`;

// TODO need to make sure that the double element selector is working properly.
const Columns = styled.div`
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
