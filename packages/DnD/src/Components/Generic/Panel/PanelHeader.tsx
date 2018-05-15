import React from 'react';

interface Props {
    title: string
}

export class PanelHeader extends React.Component<Props, {}> {
    render(): JSX.Element {
        return (
            <div className="panel-header">
                <div className="panel-header-text">
                    {this.props.title.toUpperCase()}
                </div>
            </div>
        );
    };
}  