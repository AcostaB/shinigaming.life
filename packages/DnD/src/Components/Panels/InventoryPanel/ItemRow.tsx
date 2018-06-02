import React from 'react';
import {ExpandableItem} from '../../Generic/ExpandableItem/ExpandableItem';
import {Item} from "../../../Models/Items";

interface IProps {
    item: Item,
    handleDecrease: (id: number) => void,
    handleIncrease: (id: number) => void
}

export const ItemRow = (props: IProps): JSX.Element => {
    // TODO fix tis any
    const onLimitedUseDecrease = (e: any) => {
        props.handleDecrease(e.target.key);
    };

    // TODO fix tis any
    const onLimitedUseIncrease = (e: any) => {
        props.handleIncrease(e.target.key);
    };

    const renderLimitedUseHeader = () => {
        return (
            <div className="limitedUse">
                <div className="limitedUse-main">
                    <div className="limitedUse-name">
                        {props.item.name}
                    </div>
                    <div className="limitedUse-counter">
                        <button key={props.item._id} className="limitedUse-decrease-icon" onClick={onLimitedUseDecrease}/>
                        <div className="limitedUse-uses">
                            <span>{props.item.quantity}</span>
                        </div>
                        <button className="limitedUse-increase-icon" onClick={onLimitedUseIncrease}/>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <ExpandableItem 
            expandableItemHeader={renderLimitedUseHeader()} 
            expandableItemBody={
                <div> 
                    {props.item.description}
                </div>
            }
        />
    );
}  