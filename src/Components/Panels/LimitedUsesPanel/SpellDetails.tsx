import React, { SFC } from "react";
import { Spell } from "../../../Models/LimitedUses";
import styled from "styled-components/macro";

interface Props {
  spell: Spell;
}

export const SpellDetails: SFC<Props> = ({ spell }) => {
  const {
    level,
    castingTime,
    rangeAndArea,
    duration,
    school,
    attackAndSave,
    damageAndEffect,
    description
  } = spell;

  const renderSpellDetail = (
    detailName: string,
    detailData: string | number
  ) => {
    return (
      <Detail>
        <DetailName>{detailName}</DetailName>
        <div>{detailData}</div>
      </Detail>
    );
  };

  return (
    <Details>
      {renderSpellDetail("LEVEL", level)}
      {renderSpellDetail("CASTING TIME", castingTime)}
      {renderSpellDetail("RANGE/AREA", rangeAndArea)}
      {renderSpellDetail("DURATION", duration)}
      {renderSpellDetail("SCHOOL", school)}
      {renderSpellDetail("ATTACK/SAVE", attackAndSave)}
      {renderSpellDetail("DAMAGE/EFFECT", damageAndEffect)}

      <Line />

      <div>{description}</div>
    </Details>
  );
};

const Details = styled.div`
  margin: 10px;
`;

const Detail = styled.div`
  min-width: 50px;
  width: 33%;
  display: inline-block;
`;

const DetailName = styled.div`
  font-weight: bold;
  font-family: "Roboto", Helvetica, sans-serif;
  font-size: 14px;
`;

const Line = styled.div`
  background-color: #704cd9;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 3px;
  width: 100%;
`;