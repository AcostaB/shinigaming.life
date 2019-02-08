import React, { SFC } from "react";
import { ExpandableItem } from "../../ui-toolkit/ExpandableItem/ExpandableItem";
import { Item } from "../../../Models/Items";
import styled from "styled-components/macro";

interface IProps {
  item: Item;
  handleDecrease: (id: number) => void;
  handleIncrease: (id: number) => void;
}

export const ItemRow: SFC<IProps> = ({
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
      <div className="limitedUse">
        <div className="limitedUse-main">
          <div className="limitedUse-name">{item.name}</div>
          <div className="limitedUse-counter">
            <button
              value={item._id}
              className="limitedUse-decrease-icon"
              onClick={onLimitedUseDecrease}
            />
            <div className="limitedUse-uses">
              <span>{item.quantity}</span>
            </div>
            <button
              value={item._id}
              className="limitedUse-increase-icon"
              onClick={onLimitedUseIncrease}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <ExpandableItem
      expandableItemHeader={renderLimitedUseHeader()}
      expandableItemBody={<div>{item.description}</div>}
    />
  );
};