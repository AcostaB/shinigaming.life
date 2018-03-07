import React from 'react';
import {ExpandableItem} from './Generic/ExpandableItem.js';

export class Item extends React.Component {
    renderLimitedUseHeader = (props) => {
        return (
            <div className="limitedUse">
                <div className="limitedUse-main">
                    <div className="limitedUse-name">
                        {this.props.item.name}
                    </div>
                    <div className="limitedUse-counter">
                        <button className="limitedUse-decrease-icon" onClick={this.props.handleDecrease}/>
                        <div className="limitedUse-uses">
                            <span>{this.props.item.quantity}</span>
                        </div>
                        <button className="limitedUse-increase-icon" onClick={this.props.handleIncrease}/>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return (
            <ExpandableItem 
                expandableItemHeader={this.renderLimitedUseHeader(this.props)} 
                expandableItemBody={
                    <div> 
                        {this.props.item.description}
                    </div>
                }
            />
        );
    };
}  