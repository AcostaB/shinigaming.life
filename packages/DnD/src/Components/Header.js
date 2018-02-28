import React from 'react';
import '../Styles/Header.css';

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {remainingHealth: props.character.maximumHealth}
    } 

    renderHeaderMain = (props) => {
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

    renderHeaderStats = (props) => {
        return (
            props.character.stats.map(stat => this.renderSingleStat(stat))
        );
    }

    renderSingleStat = (props) => {
        return (
            <div key={props.description} className="header-stat">
                <div className="header-stat-category">
                    { props.category }
                </div>
                <div className="header-stat-value">
                    <span className="header-stat-value-mod">{ props.mod } </span>
                    <span className="header-stat-value-value">{ props.value } </span>
                    <span className="header-stat-value-postText">{ props.valuePostText } </span>
                </div>
                <div className="header-stat-description">
                    { props.description }
                </div>
            </div>
        );
    }

    renderTracker = (props) => {
        return (
            <div>
                <div className="header-healthTracker">
                    <div className="header-healthTracker-label">
                        HIT POINTS
                    </div>
                    <div className="header-healthTracker-tracker">   
                        <button className="header-decrease-icon" onClick={this.props.decreaseHealthHandler}/>
                        <div className="header-healthTracker-health">
                            {this.props.remainingHealth}/{props.character.maximumHealth}
                        </div>
                        <button className="header-increase-icon" onClick={this.props.increaseHealthHandler}/>
                    </div>
                </div>
                <button className="header-inspirationTracker">
                    INSPIRATION
                </button>
            </div>
        );
    }

    render() {
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