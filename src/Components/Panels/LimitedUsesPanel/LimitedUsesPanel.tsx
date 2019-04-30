import React, { SFC } from "react";
import { Panel } from "../../ui-toolkit/Panel/Panel";
import { LimitedUseRow } from "./LimitedUseRow";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Actions } from "../../../Actions/dndActions";
import { LimitedUse } from "../../../Models/LimitedUses";
import { MappedState, MappedDispatch, AppStore } from "../../../Types/Types";
import { map } from "lodash";
import { Button } from '../../ui-toolkit/Button/Button';
import styled from "styled-components/macro";

interface Props {
  remainingLimitedUses: { [limitedUsesName: number]: number };
  limitedUses: LimitedUse[];
  onShortRest: () => void;
  onLongRest: () => void;
  onLimitedUseDecrease: (limitedUseId: number) => void;
  onLimitedUseIncrease: (limitedUseId: number) => void;
}

const LimitedUsesPanelBase: SFC<Props> = props => (
  <Panel>
    <Panel.Header title="LIMITED USES" />
    <Panel.Body>
      <div>
        <RestContainer>
          <Button text={'SHORT REST'} onClick={props.onShortRest} />
          <Button text={'LONG REST'} onClick={props.onLongRest} />
        </RestContainer>
        {props.limitedUses.map((limitedUse: LimitedUse) => (
          <LimitedUseRow
            key={limitedUse.id}
            limitedUse={limitedUse}
            remainingLimitedUses={props.remainingLimitedUses[limitedUse.id]}
            handleDecrease={props.onLimitedUseDecrease}
            handleIncrease={props.onLimitedUseIncrease}
          />
        ))}
      </div>
    </Panel.Body>
  </Panel>
);

const mapStateToProps = (state: AppStore): MappedState<Props> => ({
  remainingLimitedUses: state.remainingLimitedUses,
  // TODO this cast shouldnt be necessary
  limitedUses: map(state.limitedUses, value => value) as LimitedUse[]
});

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatch<Props> => ({
  onShortRest: () => dispatch(Actions.shortRest()),
  onLongRest: () => dispatch(Actions.longRest()),
  onLimitedUseDecrease: (id: number) =>
    dispatch(Actions.decreaseLimitedUse(id)),
  onLimitedUseIncrease: (id: number) => dispatch(Actions.increaseLimitedUse(id))
});

const LimitedUsesPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(LimitedUsesPanelBase);

export default LimitedUsesPanel;

const RestContainer = styled.div`
  display: flex;
`;