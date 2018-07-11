import React, {SFC} from 'react';
import {ExpandableItem} from '../../Generic/ExpandableItem/ExpandableItem';
import {Item} from "../../../Models/Items";

interface IProps {
    item: Item,
    handleDecrease: (id: number) => void,
    handleIncrease: (id: number) => void
}

export const ItemRow: SFC<IProps> = ({item, handleDecrease, handleIncrease}) => {
    // TODO fix this any
    const onLimitedUseDecrease = (e: any) => {
        handleDecrease(e.target.key);
    };

    // TODO fix this any
    const onLimitedUseIncrease = (e: any) => {
        handleIncrease(e.target.key);
    };

    const renderLimitedUseHeader = () => {
        return (
            <div className="limitedUse">
                <div className="limitedUse-main">
                    <div className="limitedUse-name">
                        {item.name}
                    </div>
                    <div className="limitedUse-counter">
                        <button key={item._id} className="limitedUse-decrease-icon" onClick={onLimitedUseDecrease}/>
                        <div className="limitedUse-uses">
                            <span>{item.quantity}</span>
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
                    {item.description}
                </div>
            }
        />
    );
}  