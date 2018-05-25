import React from 'react';
import {PanelHeader} from './PanelHeader';
import "./Panel.css";

interface pProps {
    children: JSX.Element[] | JSX.Element
}

interface hProps {
    title: string
}

interface bProps {
    children: JSX.Element[] | JSX.Element
}

export class Panel extends React.Component<pProps, {}> {

    static Header = (hProps: hProps): JSX.Element => {
        return (
            <PanelHeader title={hProps.title}/>
        );
    }

    static Body = (bProps: bProps): JSX.Element => {
        return (
            <div className="panel-content">
                {bProps.children}
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <div className="panel">
                {this.props.children}
            </div>
        );
    };
}