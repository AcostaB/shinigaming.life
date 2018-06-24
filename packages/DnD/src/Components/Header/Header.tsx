import React, {SFC} from 'react';
import './Header.css';
import {Character} from "../../Models/Character";
import Stat from "../../Models/Stat";
import {connect, Dispatch} from "react-redux"
import {IAppStore, MappedState, MappedDispatch} from "../../Types/Types";
import {Actions} from "../../Actions/dndActions";

interface IProps {
    character: Character,
    remainingHealth: number,
    decreaseHealthHandler: () => void,
    increaseHealthHandler: () => void,
    decreaseHealthBy10Handler: () => void,
    increaseHealthBy10Handler: () => void    
};

export const HeaderBase: SFC<IProps> = (props: IProps) => {
    const renderHeaderMain = () => 
        <div>
            <div className="header-characterName">
                { props.character.name }
            </div>
            <div className="header-raceClassLevel">
                { props.character.race + " " + props.character.class + " " + props.character.level }
            </div>
        </div> ;

    const renderSingleStat = (stat: Stat) => 
        <div key={stat.description} className="header-stat">
            <div className="header-stat-category">
                { stat.category }
            </div>
            <div className="header-stat-value">
                <span className="header-stat-value-mod">{ stat.mod } </span>
                <span className="header-stat-value-value">{ stat.value } </span>
                <span className="header-stat-value-postText">{ stat.valuePostText } </span>
            </div>
            <div className="header-stat-description">
                { stat.description }
            </div>
        </div>;

    const renderHeaderStats = () => props.character.stats.map(stat => renderSingleStat(stat));

    const renderTracker = () => 
            <div>
                <div className="header-healthTracker">
                    <div className="header-healthTracker-label">
                        HIT POINTS
                    </div>
                    <div className="header-healthTracker-tracker">   
                        <button className="header-decrease-icon redButton" onClick={props.decreaseHealthBy10Handler}/>
                        <button className="header-decrease-icon" onClick={props.decreaseHealthHandler}/>
                        <div className="header-healthTracker-health">
                            {props.remainingHealth}/{props.character.maximumHealth}
                        </div>
                        <button className="header-increase-icon" onClick={props.increaseHealthHandler}/>
                        <button className="header-increase-icon redButton" onClick={props.increaseHealthBy10Handler}/>
                    </div>
                </div>
                <button className="header-inspirationTracker">
                    INSPIRATION
                </button>
            </div>;

    return (
        <div className="header">
            <div className="header-main">
                {renderHeaderMain()}
            </div>
            <div className="header-stats">
                {renderHeaderStats()}
            </div>
            <div className="header-tracker">
                {renderTracker()}
            </div>
        </div>
    );
}

const mapStateToProps = (state: IAppStore): MappedState<IProps> => ({
    character: state.header.character,
    remainingHealth: state.header.remainingHealth
});

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatch<IProps> => ({
    decreaseHealthHandler: () => dispatch(Actions.decreaseHealth()),
    increaseHealthHandler: () => dispatch(Actions.increaseHealth()),
    decreaseHealthBy10Handler: () => dispatch(Actions.decreaseHealthBy10()),
    increaseHealthBy10Handler: () => dispatch(Actions.increaseHealthBy10()),    
});

const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderBase);

export default Header;