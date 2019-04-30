import React, { SFC } from "react";
import { ExpandableItem } from "../../ui-toolkit/ExpandableItem/ExpandableItem";
import { Item } from "../../../Models/Items";
import styled from "styled-components/macro";
import { PlusMinus } from "../../ui-toolkit/Icons/PlusMinus/PlusMinus";

interface Props {
  item: Item;
  handleDecrease: (id: number) => void;
  handleIncrease: (id: number) => void;
}

export const ItemRow: SFC<Props> = (props) => {
  const { item, handleDecrease, handleIncrease } = { ...props };

  const renderLimitedUseHeader = () => {
    return (
      <Container>
        <Main>
          <Name>{item.name}</Name>
          <Counter>
            <PlusMinus
              isPlus={false}
              onClick={() => handleDecrease(item._id)}
            />
            <Uses>
              <span>{item.quantity}</span>
            </Uses>
            <PlusMinus
              isPlus={true}
              onClick={() => handleIncrease(item._id)}
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