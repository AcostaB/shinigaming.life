// import React, {MouseEvent} from 'react';
import React from "react";
import { Panel } from "../../ui-toolkit/Panel/Panel";
import { ItemRow } from "./ItemRow";
import { Item } from "../../../Models/Items";
import { Currency } from "../../../Models/Currency";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Actions } from "../../../Actions/dndActions";
import { MappedState, MappedDispatch, IAppStore } from "../../../Types/Types";
import { map } from "lodash";
import styled from "styled-components/macro";

interface IProps {
  items: Item[];
  handleItemIncrease: (id: number) => void;
  handleItemDecrease: (id: number) => void;
  currency: Currency;
}

interface IState {
  addNewItemExpanded: boolean;
  isCurrencyTabActive: boolean;
}

// TODO REFACTOR TO USE HOOKS
class InventoryPanelBase extends React.Component<IProps, IState> {
  public state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isCurrencyTabActive: false,
      addNewItemExpanded: false
    };
  }

  activateInventoryTab = () =>
    this.setState(() => ({ isCurrencyTabActive: false }));

  activateCurrencyTab = () =>
    this.setState(() => ({ isCurrencyTabActive: true }));

  renderInventory = (items: Item[]): JSX.Element => {
    return (
      <div>
        {items.map(item => (
          <ItemRow
            key={item._id}
            item={item}
            handleDecrease={this.props.handleItemDecrease}
            handleIncrease={this.props.handleItemIncrease}
          />
        ))}
        <div>
          <button
          // onClick={() => {this.setState(prevState =>  ({addNewItemExpanded: !prevState.addNewItemExpanded}))}}
          >
            Add item
          </button>
          {this.state.addNewItemExpanded && (
            <button
            // onClick={() => {this.setState(prevState =>  ({addNewItemExpanded: !prevState.addNewItemExpanded}))}}
            >
              Submit
            </button>
          )}
          {this.state.addNewItemExpanded && this.renderAddItemForm()}
        </div>
      </div>
    );
  };

  renderAddItemForm = () => (
    <div>
      <div>
        <span>Name</span>
        <input type="text" />
      </div>
      <div>
        <span>Quantity</span>
        <input type="text" />
      </div>
      <div>
        <span>Description</span>
        <input type="text" />
      </div>
    </div>
  );

  renderCurrency = (currency: Currency) => {
    let value = "";

    const switchCase = (key: string) => {
      switch (key) {
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
      }
      return value;
    };

    return (
      // TODO fix this. Use lodash.
      Object.keys(currency).map(key => (
        <StyledCurrency key={key}>
          {/* TODO STILL USING CLASS NAME */}
          <div className="currency-icon" />
          <CurrencyLabel>
            <CurrencyLabelPrimary>{key}</CurrencyLabelPrimary>
            <CurrencyLabelSecondary>{switchCase(key)}</CurrencyLabelSecondary>
          </CurrencyLabel>
          <div>{currency[key]}</div>
        </StyledCurrency>
      ))
    );
  };

  render() {
    return (
      <Panel>
        <Panel.Header title="INVENTORY" />
        <Panel.Body>
          <StyledInventoryPanel>
            <InventoryTabs>
              <InventoryTabsItems
                key="tab-item"
                isActive={this.state.isCurrencyTabActive}
                onClick={this.activateInventoryTab}>
                Items
                </InventoryTabsItems>
              <InventoryTabsCurrency
                key="tab-currency"
                isActive={this.state.isCurrencyTabActive}
                onClick={this.activateCurrencyTab}
              >
                Currency
                </InventoryTabsCurrency>
            </InventoryTabs>
            {!this.state.isCurrencyTabActive
              ? this.renderInventory(this.props.items)
              : this.renderCurrency(this.props.currency)}
          </StyledInventoryPanel>
        </Panel.Body>
      </Panel>
    );
  }
}

const mapStateToProps = (state: IAppStore): MappedState<IProps> => ({
  items: map(state.inventory, value => value),
  currency: state.currency
});

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatch<IProps> => ({
  handleItemIncrease: (id: number) => dispatch(Actions.increaseItem(id)),
  handleItemDecrease: (id: number) => dispatch(Actions.decreaseItem(id))
});

const InventoryPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryPanelBase);

export default InventoryPanel;



const StyledInventoryPanel = styled.div`
  padding-top: 40px;
`;

const InventoryTabs = styled.div`
  left: 0;
  right: 0;
  display: flex;
  position: absolute;
  z-index: 5;
  top: 52px;
`;

const InventoryTabsItems = styled.div`
  border-left: none;
  flex: 1;
  padding: 7px 0;
  text-transform: uppercase;
  font-size: 12px;
  font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
  font-weight: bold;
  background-color: ${(props: { isActive: boolean }) => props.isActive ? '#96bf6b' : '#c3c0ba'};
  color: #fff;
  cursor: pointer;
  text-align: center;
`;

const InventoryTabsCurrency = styled.div`
  flex: 1;
  padding: 7px 0;
  text-transform: uppercase;
  font-size: 12px;
  font-family: "Roboto Condensed", Roboto, Helvetica, sans-serif;
  font-weight: bold;
  background-color: ${(props: { isActive: boolean }) => props.isActive ? '#96bf6b' : '#c3c0ba'};
  color: #fff;
  border-left: 1px solid #fff;
  cursor: pointer;
  text-align: center;
`;

const StyledCurrency = styled.div`  
  position: relative;
  z-index: 2;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-left: 10px;
  padding-right: 8px;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  height: 65px;
  background-size: 100 % 67px;
`;

const CurrencyLabel = styled.div`
  flex: 1;
  min-width: 0;
  text-align: left;
`;

const CurrencyLabelPrimary = styled.div`
  font-size: 18px;
  font-weight: bold;
  font-family: Roboto, Helvetica, sans-serif;
  line-height: 1.1;
`;

const CurrencyLabelSecondary = styled.div`
  color: #979aa4;
  font-size: 10px;
  font-family: Roboto, Helvetica, sans-serif;
  text-transform: uppercase;
`;