import React from 'react';
import {PanelHeader} from './PanelHeader.js';

export class Panel extends React.Component {
    render() {
        const {title} = this.props;

        return (
            <div>
                <div className="panel">
                    <PanelHeader title={title}/>
                    
                    <div className="panel-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    };
}  