import React, {SFC} from 'react';
import {Panel} from "../../Generic/Panel/Panel";
import {AttackRow} from "./AttackRow";
import {Attack} from "../../../Models/Attacks";
import {connect} from "react-redux";
import {MappedState, IAppStore} from "../../../Types/Types";
import {map} from "lodash";

interface IProps {
    attacks: Attack[]
    adversityMod?: number
}

const AttacksPanelBase: SFC<IProps> = ({attacks, adversityMod = 5}) => 
    <Panel>
        <Panel.Header title="ATTACKS"/>
        <Panel.Body>
            <div>
                <div className="attacks-perAction">
                    Attacks Per Action: 2
                </div>
                {attacks.map(attack => 
                    <AttackRow 
                        key={attack.name} 
                        attack={attack} 
                        adversityMod={adversityMod}/>)
                }
            </div>
        </Panel.Body>
    </Panel>;

const mapStateToProps = (state: IAppStore): MappedState<IProps> => ({
    attacks: map(state.attacks, value => value),
    adversityMod: Math.floor((1-(state.remainingHealth/state.character.maximumHealth)) * 4)
})

const AttacksPanel = connect(
    mapStateToProps
)(AttacksPanelBase)

export default AttacksPanel;