import React, {SFC} from 'react';
import {Panel} from "../../Generic/Panel/Panel";
import {ExpandableItem} from "../../Generic/ExpandableItem/ExpandableItem";
import {Passive} from "../../../Models/Passives";
import "./Passive.css";
import {connect} from "react-redux";

interface IProps {
    passives: Passive[]
}

const PassivesPanelBase: SFC<IProps> = ({passives}) => 
    <Panel>
        <Panel.Header title="PASSIVES"/>
        <Panel.Body>
            {passives.map(passive => 
                <ExpandableItem 
                    key={passive.id} 
                    expandableItemHeader={
                        <span className="passive-name">
                            {passive.name}
                        </span>
                    } 
                    expandableItemBody={passive.description}
                />
            )}
        </Panel.Body>
    </Panel>;


const mapStateToProps = (state: any): IProps => ({
    passives: state.PassivesPanel.passives
});

const PassivesPanel = connect(
    mapStateToProps
)(PassivesPanelBase);

export default PassivesPanel;