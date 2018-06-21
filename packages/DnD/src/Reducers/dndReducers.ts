import {Actions, dndActions} from "../Actions/dndActions";
import {combineReducers} from "redux";
import {IAppStore} from "../Types/Types";
import {reduce} from "lodash";
import {Currency} from "../Models/Currency";

// TODO need initial state
const initialState: IAppStore = {
    limitedUses: {},
    remainingLimitedUses: {},
    remainingItems: {},
    currency: new Currency()
}

export const restReducer = (state : IAppStore = initialState, action: Actions) => {
    switch (action.type) {
        case dndActions.SHORT_REST:
            const remainingLimitedUses = reduce(state.limitedUses, (accumulator, value) => {
                return accumulator[value.id] = value.shortRestRecover ? value.maxUses : state.remainingLimitedUses[value.id];
            }, {});

            return { remainingLimitedUses };
        case dndActions.LONG_REST: 
            // TODO fix this. why cant i redeclare in this? scope is different.
            const remainingLimitedUses2 = reduce(state.limitedUses, (accumulator, value) => {
                return accumulator[value.id] = value.maxUses;
            }, {});

            return { remainingLimitedUses: remainingLimitedUses2 };
        default: 
            return state;
    }
}

export const limitedUsesReducer = (state: IAppStore = initialState, action: Actions) => {
    switch (action.type) {
        case dndActions.DECREASE_LIMITED_USE: 
            const newValue = state.remainingLimitedUses[action.payload] > 0 ? state.remainingLimitedUses[action.payload] - 1 : 0;
            
            return {remainingLimitedUses: {...state.remainingLimitedUses, [action.payload]: newValue}}
        case dndActions.INCREASE_LIMITED_USE: 
            // TODO fix this. why cant i redeclare in this? scope is different.
            const maxUses = state.limitedUses[action.payload].maxUses;
            const newValue2 = state.remainingLimitedUses[action.payload] < maxUses ? state.remainingLimitedUses[action.payload] + 1 : maxUses;

            return {remainingLimitedUses: {...state.remainingLimitedUses, [action.payload]: newValue2}}
        default: 
            return state
    }
}

export const inventoryReducer = (state : IAppStore = initialState, action: Actions) => {
    switch (action.type) {
        case dndActions.TOGGLE_INVENTORY_TAB:  
        case dndActions.DELETE_ITEM: 
        case dndActions.ADD_ITEM: 
        case dndActions.DECREASE_ITEM: 
        case dndActions.INCREASE_ITEM: 
        default:
            return state
    }
}

export default combineReducers({
    restReducer,
    limitedUsesReducer,
    inventoryReducer
});