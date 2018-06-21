import {Actions, dndActions} from "../Actions/dndActions";
import {combineReducers} from "redux";
import {IAppStore} from "../Types/Types";
import {abilities} from "../Models/Abilities";
import {attacks} from "../Models/Attacks";
import {currency} from '../Models/Currency';
import {items} from '../Models/Items';
import {leftColumnSkills, rightColumnSkills} from "../Models/Skills";
import {limitedUses} from "../Models/LimitedUses";
import {passives} from "../Models/Passives";
import {keyBy, reduce} from "lodash";

// TODO need to improve on this
const initialState: IAppStore = {
    abilities: keyBy(abilities, "id"),
    attacks: keyBy(attacks, "id"),
    inventory: keyBy(items, "_id"),
    limitedUses: keyBy(limitedUses, "id"),
    passives: keyBy(passives, "id"),
    leftColumnSkills: keyBy(leftColumnSkills, "id"),
    rightColumnSkills: keyBy(rightColumnSkills, "id"),
    remainingLimitedUses: reduce(limitedUses, (accumulator, currentValue) => { 
        accumulator[currentValue.id] = currentValue.maxUses; 
        return accumulator;
      }, {}),
    remainingItems: {},
    currency,
    currencyTabActive: true,
    addNewItemExpanded: false
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