import React from 'react';
import './Header.css';
import {Character, Stat} from "../../Models/Character";

interface IProps {
    character: Character,
    remainingHealth: number,
    decreaseHealthHandler: () => void,
    increaseHealthHandler: () => void,
    decreaseHealthBy10Handler: () => void,
    increaseHealthBy10Handler: () => void    
}

export class Header extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    } 

    public renderHeaderMain = (props: IProps) => {
        return (
            <div>
                <div className="header-characterName">
                    { props.character.name }
                </div>
                <div className="header-raceClassLevel">
                    { props.character.race + " " + props.character.class + " " + props.character.level }
                </div>
            </div> 
        );
    }

    public renderHeaderStats = (props: IProps) => {
        return (
            props.character.stats.map(stat => this.renderSingleStat(stat))
        );
    }

    public renderSingleStat = (stat: Stat) => {
        return (
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
            </div>
        );
    }

    public renderTracker = (props: IProps) => {
        return (
            <div>
                <div className="header-healthTracker">
                    <div className="header-healthTracker-label">
                        HIT POINTS
                    </div>
                    <div className="header-healthTracker-tracker">   
                        <button className="header-decrease-icon redButton" onClick={this.props.decreaseHealthBy10Handler}/>
                        <button className="header-decrease-icon" onClick={this.props.decreaseHealthHandler}/>
                        <div className="header-healthTracker-health">
                            {this.props.remainingHealth}/{props.character.maximumHealth}
                        </div>
                        <button className="header-increase-icon" onClick={this.props.increaseHealthHandler}/>
                        <button className="header-increase-icon redButton" onClick={this.props.increaseHealthBy10Handler}/>
                    </div>
                </div>
                <button className="header-inspirationTracker">
                    INSPIRATION
                </button>
            </div>
        );
    }

    public render() {
        return (
            <div className="header">
                <div className="header-main">
                    {this.renderHeaderMain(this.props)}
                </div>
                <div className="header-stats">
                    {this.renderHeaderStats(this.props)}
                </div>
                <div className="header-tracker">
                    {this.renderTracker(this.props)}
                </div>
            </div>
        );
    }
}