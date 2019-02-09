import React, { SFC, SyntheticEvent } from "react";
import { ExpandableItem } from "../../ui-toolkit/ExpandableItem/ExpandableItem";
import { SpellDetails } from "./SpellDetails";
import { LimitedUse } from "../../../Models/LimitedUses";
import { Spell } from "../../../Models/LimitedUses";
import styled from "styled-components/macro";
import PlusMinusWhite from "../../../Assets/plus_minus-white.svg";

interface IProps {
  limitedUse: LimitedUse;
  remainingLimitedUses: number;
  handleDecrease: (limitedUseId: number) => void;
  handleIncrease: (limitedUseId: number) => void;
}

export const LimitedUseRow: SFC<IProps> = props => {
  const onDecrease = (e: SyntheticEvent) =>
    props.handleDecrease(parseInt((e.target as HTMLInputElement).value, 10));

  const onIncrease = (e: SyntheticEvent) =>
    props.handleIncrease(parseInt((e.target as HTMLInputElement).value, 10));

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
          <DecreaseIcon
            value={props.limitedUse.id}
            onClick={onDecrease}
          />
          <Uses>
            <span>{props.remainingLimitedUses}</span>
            <span>/</span>
            <span>{props.limitedUse.maxUses}</span>
          </Uses>
          <IncreaseIcon
            value={props.limitedUse.id}
            onClick={onIncrease}
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

const IncreaseIcon = styled.button`
  display: inline-block;
  border-radius: 3px;
  background-color: #96bf6b;
  color: #fff;
  font-family: "Roboto Condensed",Roboto,Helvetica,sans-serif;
  font-size: 10px;
  border: 1px solid transparent;
  text-transform: uppercase;
  height: 20px;
  width: 27px;

  // TODO DUPLICATE STYLES
  ::before {
    content: "";
    display: block;
    height: 14px;
    width: 14px;
    background-image: url(${PlusMinusWhite});
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const DecreaseIcon = styled.button`
  display: inline-block;
  border-radius: 3px;
  background-color: #96bf6b;
  color: #fff;
  font-family: "Roboto Condensed",Roboto,Helvetica,sans-serif;
  font-size: 10px;
  border: 1px solid transparent;
  text-transform: uppercase;
  height: 20px;
  width: 27px;

  // TODO DUPLICATE STYLES
  ::before {
    content: "";
    display: block;
    height: 14px;
    width: 14px;
    background-image: url(${PlusMinusWhite});
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: -17px 0;
  }
`;