import React, { SFC, SyntheticEvent } from "react";
import { ExpandableItem } from "../../Generic/ExpandableItem/ExpandableItem";
import { SpellDetails } from "./SpellDetails";
import "./LimitedUse.css";
import { LimitedUse } from "../../../Models/LimitedUses";
import { Spell } from "../../../Models/LimitedUses";

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
    <div className="limitedUse">
      <div className="limitedUse-main">
        <div className="limitedUse-label">
          <span className="limitedUse-name">{props.limitedUse.name}</span>
          <span className="limitedUse-level">
            {`(lv. ${props.limitedUse.level})`}
          </span>
        </div>
        <div className="limitedUse-counter">
          <button
            className="limitedUse-decrease-icon"
            value={props.limitedUse.id}
            onClick={onDecrease}
          />
          <div className="limitedUse-uses">
            <span>{props.remainingLimitedUses}</span>
            <span>/</span>
            <span>{props.limitedUse.maxUses}</span>
          </div>
          <button
            className="limitedUse-increase-icon"
            value={props.limitedUse.id}
            onClick={onIncrease}
          />
        </div>
      </div>
    </div>
  );

  const renderLimitedUseBasic = (description: string) => (
    <div>{description}</div>
  );

  const renderLimitedUseBody = () =>
    props.limitedUse.hasOwnProperty('spellLevel') ? (
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
