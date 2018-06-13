import React, {SFC} from 'react';
import {Panel} from "../../Generic/Panel/Panel";
import {AttackRow} from "./AttackRow";
import {Attack} from "../../../Models/Attacks";
import {connect} from "react-redux";

interface IProps {
    attacks: Attack[],
    adversityMod: number
}

const AttacksPanelBase: SFC<IProps> = ({attacks, adversityMod}) => 
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

const mapStateToProps = (state: any): IProps => ({
    attacks: state.attacksPanel.attacks,
    adversityMod: state.attackPanel.adversityMod
})

const AttacksPanel = connect(
    mapStateToProps
)(AttacksPanelBase)

export default AttacksPanel;