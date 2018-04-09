import React from 'react';
import {PanelHeader} from './PanelHeader.js';
import "./Panel.css";

export class Panel extends React.Component {
    render() {
        return (
            <div className="panel">
                {this.props.children}
            </div>
        );
    };
}  

Panel.Header = props => {
    return (
        <PanelHeader title={props.title}/>
    );
}

Panel.Body = props => {
    return (
        <div className="panel-content">
            {props.children}
        </div>
    );
}