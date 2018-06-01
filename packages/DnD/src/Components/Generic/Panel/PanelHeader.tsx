import React from 'react';

interface IProps {
    title: string
}

export class PanelHeader extends React.Component<IProps, {}> {
    public render(): JSX.Element {
        return (
            <div className="panel-header">
                <div className="panel-header-text">
                    {this.props.title.toUpperCase()}
                </div>
            </div>
        );
    };
}  