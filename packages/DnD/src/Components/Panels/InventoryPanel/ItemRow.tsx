import React from 'react';
import {ExpandableItem} from '../../Generic/ExpandableItem/ExpandableItem';
import {Item} from "../../../Models/Items";

interface IProps {
    item: Item,
    handleDecrease: () => void,
    handleIncrease: () => void
}

export class ItemRow extends React.Component<IProps, {}> {
    renderLimitedUseHeader = (props: IProps) => {
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