import React from 'react';
import {PanelHeader} from './PanelHeader';
import "./Panel.css";

interface IPanelProps {
    children: JSX.Element[] | JSX.Element
}

interface IHeaderProps {
    title: string
}

interface IBodyProps {
    children: JSX.Element[] | JSX.Element
}

export class Panel extends React.Component<IPanelProps, {}> {

    public static Header = (hProps: IHeaderProps): JSX.Element => {
        return (
            <PanelHeader title={hProps.title}/>
        );
    }

    public static Body = (bProps: IBodyProps): JSX.Element => {
        return (
            <div className="panel-content">
                {bProps.children}
            </div>
        );
    }

    public render(): JSX.Element {
        return (
            <div className="panel">
                {this.props.children}
            </div>
        );
    };
}