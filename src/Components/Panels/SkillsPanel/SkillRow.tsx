import React, { SFC } from 'react';
import { Skill } from "../../../Models/Skills";
import styled from 'styled-components/macro';

interface Props {
    skill: Skill
}

export const SkillRow: SFC<Props> = ({ skill }) => {
    const modSign: string = skill.mod >= 0 ? "+" : "-";

    return (
        <SkillItem>
            <SkillItemAbility>
                ({skill.abilityName})
            </SkillItemAbility>
            <SkillItemName>
                <span>
                    {skill.skillName}
                </span>
                <SkillItemProficiency isProficient={skill.isProficient} />
            </SkillItemName>
            <SkillItemModCell>
                <div>
                    {modSign}
                </div>
                <div>
                    {Math.abs(skill.mod)}
                </div>
            </SkillItemModCell>
        </SkillItem>
    );
}

const SkillItem = styled.div`
    font-size: 15px;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
    padding: 5px 0;
    line-height: 1;
`;

const SkillItemAbility = styled.div`    
    display: flex;
    width: 100%;
    margin-bottom: 4px;
    color: #979aa4;
    text-transform: uppercase;
    font-size: 10px;
    text-align: left;
    flex-wrap: wrap;
`;

const SkillItemName = styled.div`
    display: flex;
    flex-grow: 1;
    line-height: 1;
    flex-wrap: wrap;
`;

const SkillItemProficiency = styled.div`
    ${(props: { isProficient: boolean }) => props.isProficient
        ? `
        -webkit-flex-wrap: wrap;
        margin-top: 5px;
        margin-left: 5px;
        display: inline-block;
        vertical-align: middle;
        width: 5px;
        height: 5px;
        background-color: #96bf6b;
        border-radius: 50%;
        `
        : ''}
`;

const SkillItemModCell = styled.div`
    display: flex;
    flex-wrap: wrap;
`;