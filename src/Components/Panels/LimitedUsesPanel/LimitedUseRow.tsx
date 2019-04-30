import React, { SFC } from "react";
import { ExpandableItem } from "../../ui-toolkit/ExpandableItem/ExpandableItem";
import { SpellDetails } from "./SpellDetails";
import { LimitedUse } from "../../../Models/LimitedUses";
import { Spell } from "../../../Models/LimitedUses";
import styled from "styled-components/macro";
import { PlusMinus } from "../../ui-toolkit/Icons/PlusMinus/PlusMinus";

interface Props {
  limitedUse: LimitedUse;
  remainingLimitedUses: number;
  handleDecrease: (limitedUseId: number) => void;
  handleIncrease: (limitedUseId: number) => void;
}

export const LimitedUseRow: SFC<Props> = props => {
  const onDecrease = (skillID: number) =>
    props.handleDecrease(skillID);

  const onIncrease = (skillID: number) =>
    props.handleIncrease(skillID);

  const renderLimitedUseHeader = () => (
    <Container>
      <Main>
        <Label>
          <Name>{props.limitedUse.name}</Name>
          <Level>
            {`(lv. ${props.limitedUse.level})`}
          </Level>
        </Label>
        <Counter>
          <PlusMinus
            onClick={() => onDecrease(props.limitedUse.id)}
            isPlus={false}
          />
          <Uses>
            <span>{props.remainingLimitedUses}</span>
            <span>/</span>
            <span>{props.limitedUse.maxUses}</span>
          </Uses>
          <PlusMinus
            onClick={() => onIncrease(props.limitedUse.id)}
            isPlus={true}
          />
        </Counter>
      </Main>
    </Container>
  );

  const renderLimitedUseBasic = (description: string) => (
    <div>{description}</div>
  );

  const renderLimitedUseBody = () =>
    props.limitedUse.hasOwnProperty("spellLevel") ? (
      <SpellDetails spell={props.limitedUse as Spell} />
    ) : (
        renderLimitedUseBasic(props.limitedUse.description)
      );

  return (
    <ExpandableItem
      expandableItemHeader={renderLimitedUseHeader()}
      expandableItemBody={renderLimitedUseBody()}
    />
  );
};

const Container = styled.div`
  width: 100%;
  -webkit-align-items: center;
  align-items: center;
  line-height: 2.5;
`;

const Label = styled.div`
  display: flex;
  min-width: 150px;
  align-items: center;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: bold;
  font-family: 'Roboto Condensed', "Roboto";
  line-height: 1.1;
  flex: 2;
  align-items: center;
`;

const Level = styled.div`
  align-items: center;
  color: #979aa4;
  font-size: 10px;
  font-family: "Roboto", Helvetica, sans-serif;
  flex: 1;
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  -webkit-align-items: center;
  align-items: center;
`;

const Counter = styled.div`
  display: flex;
  width: 40%;
  -webkit-align-items: center;
`;

const Uses = styled.div`
  font-size: 15px;
  margin: 0 5px 0 5px;
  font-family: Roboto,Helvetica,sans-serif;
`;
