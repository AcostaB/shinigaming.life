import React from 'react';
import {Panel} from "../../Generic/Panel/Panel.js";
import {ItemRow} from "./ItemRow.js";
import {Item} from "../../../Models/Items";
import {Currency} from "../../../Models/Currency";
import "./InventoryPanel.css";

interface Props {
    items: Item[],
    handleItemIncrease: (id: number) => void,
    handleItemDecrease: (id: number) => void,
    currency: Currency
}

interface State {
    addNewItemExpanded: boolean,
    isCurrencyTabActive: boolean
}

export default class InventoryPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isCurrencyTabActive: false,
            addNewItemExpanded: false
        };
    } 

    renderInventory = (items: Item[]) => {
        return (
            <div>
                {items.map((item) => 
                    <ItemRow 
                        key={item._id} 
                        item={item}
                        handleDecrease={() => this.props.handleItemDecrease(item._id)}
                        handleIncrease={() => this.props.handleItemIncrease(item._id)}
                    />
                )}
                <div> 
                    <button 
                        className="shortRest" 
                        onClick={() => {this.setState(prevState =>  ({addNewItemExpanded: !prevState.addNewItemExpanded}))}}
                    >
                        Add item
                    </button>
                    {this.state.addNewItemExpanded && 
                        <button 
                            className="shortRest blue" 
                            onClick={() => {this.setState(prevState =>  ({addNewItemExpanded: !prevState.addNewItemExpanded}))}}
                        >
                            Submit
                        </button>
                    }
                    { this.state.addNewItemExpanded && this.renderAddItemForm() }
                </div>
          </div>
        );
    };
    
    renderAddItemForm = () => {
        return (
            <div>
                <div className="addItem-row">
                    <span className="input-label">
                        Name
                    </span>
                    <input className="input" type="text"/>
                </div>
                <div className="addItem-row">
                    <span className="input-label">
                        Quantity
                    </span>
                    <input className="input" type="text"/>
                </div>
                <div className="addItem-row">
                    <span className="input-label">
                        Description
                    </span>
                    <input className="input" type="text"/>
                </div>
            </div>
        );
    }
    
    renderCurrency = (currency: Currency) => {
        let value = "";
    
        const switchCase = (key: string) => {
            switch(key) {
                case "Platinum":
                    value = "= 10 GP";
                    break;
                case "Gold":
                    value = "= 10 SP";
                    break;
                case "Electrum":
                    value = "= 5 SP";
                    break;
                case "Silver":
                    value = "= 10 CP";
                    break;
                case "Copper":
                    value = "";
                    break;
                default:
                    break;
            };
            return value;
        };
    
        return (
            Object.keys(currency).map(key => 
                (
                    <div key={key} className="expandableItem-header currency">
                        <div className="currency-icon">
            
                        </div>
                        <div className="currency-label">
                            <div className="currency-label-primary">
                                {key}
                            </div>
                            <div className="currency-label-secondary">
                                {switchCase(key)}
                            </div>
                        </div>
                        <div className="currency-input">
                            {currency[key]}
                        </div>
                    </div>
                )
            )
        );
    }

    render() {
        return (
            <Panel>
                <Panel.Header title="INVENTORY"/>
                <Panel.Body>
                    <div className="inventory-panel">
                        <div className="inventory-tabs">
                        <div 
                            className={"inventory-tabs-items " + (this.state.isCurrencyTabActive ? "":"active") }
                            onClick={() => {this.setState({isCurrencyTabActive: false})}}>
                            Items
                        </div>
                        <div 
                            className={"inventory-tabs-currency " + (this.state.isCurrencyTabActive ? "active":"") }
                            onClick={() => {this.setState({isCurrencyTabActive: true})}}>
                            Currency
                        </div>
                        </div>
                        {!this.state.isCurrencyTabActive ? 
                        this.renderInventory(this.props.items) : this.renderCurrency(this.props.currency)}
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
};

