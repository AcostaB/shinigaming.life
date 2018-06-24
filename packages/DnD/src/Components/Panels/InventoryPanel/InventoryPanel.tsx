// import React, {MouseEvent} from 'react';
import React from 'react';
import {Panel} from "../../Generic/Panel/Panel";
import {ItemRow} from "./ItemRow";
import {Item} from "../../../Models/Items";
import {Currency} from "../../../Models/Currency";
import "./InventoryPanel.css";
import {connect, Dispatch} from "react-redux";
import {Actions} from "../../../Actions/dndActions";
import {MappedState, MappedDispatch, IAppStore} from "../../../Types/Types";
import {map} from "lodash";

interface IProps {
    items: Item[],
    handleItemIncrease: (id: number) => void,
    handleItemDecrease: (id: number) => void,
    currency: Currency
}

interface IState {
    addNewItemExpanded: boolean,
    isCurrencyTabActive: boolean
}

class InventoryPanelBase extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isCurrencyTabActive: false,
            addNewItemExpanded: false
        };
    } 

    // TODO: fix this any.
    // TODO: toggleCurrencyTab = (e: MouseEvent<HTMLElement>): void => {
    toggleCurrencyTab = (e: any): void => {
            if (e.target.key === "currency") {
            this.setState(() => ({isCurrencyTabActive: true}))
        } else {
            this.setState(() => ({isCurrencyTabActive: false}))   
        }
    };

    renderInventory = (items: Item[]): JSX.Element => {
        return (
            <div>
                {items.map((item) => 
                    <ItemRow 
                        key={item._id} 
                        item={item}
                        handleDecrease={this.props.handleItemDecrease}
                        handleIncrease={this.props.handleItemIncrease}
                    />
                )}
                <div> 
                    <button 
                        className="shortRest" 
                        // onClick={() => {this.setState(prevState =>  ({addNewItemExpanded: !prevState.addNewItemExpanded}))}}
                    >
                        Add item
                    </button>
                    {this.state.addNewItemExpanded && 
                        <button 
                            className="shortRest blue" 
                            // onClick={() => {this.setState(prevState =>  ({addNewItemExpanded: !prevState.addNewItemExpanded}))}}
                        >
                            Submit
                        </button>
                    }
                    { this.state.addNewItemExpanded && this.renderAddItemForm() }
                </div>
          </div>
        );
    };
    
    renderAddItemForm = () => 
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
        </div>;
    
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
            // TODO fix this. Use lodash.
            Object.keys(currency).map(key => 
                (
                    <div key={key} className="expandableItem-header currency">
                        <div className="currency-icon"/>
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
                            key="tab-item" 
                            className={"inventory-tabs-items " + (this.state.isCurrencyTabActive ? "":"active") }
                            onClick={this.toggleCurrencyTab}>
                            Items
                        </div>
                        <div
                            key="tab-currency" 
                            className={"inventory-tabs-currency " + (this.state.isCurrencyTabActive ? "active":"") }
                            onClick={this.toggleCurrencyTab}>
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

// TODO fix this any. 
const mapStateToProps = (state: IAppStore): MappedState<IProps> => ({
    items: map(state.inventory.inventory, value => value),
    currency: state.inventory.currency
});

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatch<IProps> => ({
    handleItemIncrease: (id: number) => dispatch(Actions.increaseItem(id)),
    handleItemDecrease: (id: number) => dispatch(Actions.decreaseItem(id)),
})

const InventoryPanel = connect(
    mapStateToProps,
    mapDispatchToProps
)(InventoryPanelBase);

export default InventoryPanel;