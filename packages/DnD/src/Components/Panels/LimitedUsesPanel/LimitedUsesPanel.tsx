import React, {SFC} from 'react';
import {Panel} from "../../Generic/Panel/Panel";
import {LimitedUseRow} from "./LimitedUseRow";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {Actions} from "../../../Actions/dndActions";
import {LimitedUse} from "../../../Models/LimitedUses";
import {MappedState, MappedDispatch, IAppStore} from "../../../Types/Types";
import {map} from "lodash";

interface IProps {
    remainingUses: { [limitedUsesName: number]: number; },
    limitedUses: LimitedUse[],
    onShortRest: () => void,
    onLongRest: () => void,
    onLimitedUseDecrease: (limitedUseId: number) => void,
    onLimitedUseIncrease: (limitedUseId: number) => void
}

const LimitedUsesPanelBase: SFC<IProps> = (props) => 
    <Panel>
        <Panel.Header title="LIMITED USES"/>
        <Panel.Body>
            <div>
                <div className="rest-buttons">
                        <button className="shortRest" onClick={props.onShortRest}>SHORT REST</button>
                        <button className="longRest" onClick={props.onLongRest}>LONG REST</button>
                </div>
                {props.limitedUses.map((limitedUse: any) => 
                    <LimitedUseRow
                        key={limitedUse.id} 
                        isSpell={limitedUse.isSpell} 
                        limitedUse={limitedUse} 
                        remainingUses={props.remainingUses[limitedUse.id]}
                        handleDecrease={props.onLimitedUseDecrease}
                        handleIncrease={props.onLimitedUseIncrease}/>
                    )
                }
            </div>
        </Panel.Body>
    </Panel>;

// TODO need to fix this. both state and return are anys.
const mapStateToProps = (state: IAppStore): MappedState<IProps> => ({
    remainingUses: state.limitedUses.remainingLimitedUses,
    // TODO this cast shouldnt be necessary
    limitedUses: (map(state.limitedUses.limitedUses, value => value) as LimitedUse[])
});

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatch<IProps> => ({
    onShortRest: () => dispatch(Actions.shortRest()),
    onLongRest: () => dispatch(Actions.longRest()),
    onLimitedUseDecrease: (id: number) => dispatch(Actions.decreaseLimitedUse(id)),
    onLimitedUseIncrease: (id: number) => dispatch(Actions.increaseLimitedUse(id))
});

const LimitedUsesPanel = connect(
    mapStateToProps, 
    mapDispatchToProps
)(LimitedUsesPanelBase);

export default LimitedUsesPanel;