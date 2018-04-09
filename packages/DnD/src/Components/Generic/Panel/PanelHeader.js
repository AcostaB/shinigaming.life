import React from 'react';

export class PanelHeader extends React.Component {
    render() {
        return (
            <div className="panel-header">
                <div className="panel-header-text">
                    {this.props.title.toUpperCase()}
                </div>
            </div>
        );
    };
}  