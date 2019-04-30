import React, { SFC } from "react";
import { ExpandableItem } from "../../ui-toolkit/ExpandableItem/ExpandableItem";
import { Item } from "../../../Models/Items";
import styled from "styled-components/macro";
import PlusMinusWhite from "../../../Assets/plus_minus-white.svg";

interface Props {
  item: Item;
  handleDecrease: (id: number) => void;
  handleIncrease: (id: number) => void;
}

export const ItemRow: SFC<Props> = ({
  item,
  handleDecrease,
  handleIncrease
}) => {
  const onLimitedUseDecrease = (e: any) => {
    handleDecrease(e.target.value);
  };

  const onLimitedUseIncrease = (e: any) => {
    handleIncrease(e.target.value);
  };

  const renderLimitedUseHeader = () => {
    return (
      <Container>
        <Main>
          <Name>{item.name}</Name>
          <Counter>
            <DecreaseIcon
              value={item._id}
              onClick={onLimitedUseDecrease}
            />
            <Uses>
              <span>{item.quantity}</span>
            </Uses>
            <IncreaseIcon
              value={item._id}
              onClick={onLimitedUseIncrease}
            />
          </Counter>
        </Main>
      </Container>
    );
  };

  return (
    <ExpandableItem
      expandableItemHeader={renderLimitedUseHeader()}
      expandableItemBody={<div>{item.description}</div>}
    />
  );
};

const Container = styled.div`
  width: 100%;
  -webkit-align-items: center;
  align-items: center;
  line-height: 2.5;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: bold;
  font-family: 'Roboto Condensed', "Roboto";
  line-height: 1.1;
  flex: 2;
  align-items: center;
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