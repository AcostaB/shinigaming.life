import {Actions, dndActions} from "../Actions/dndActions";
import {combineReducers} from "redux";
// import {IAppStore} from "../Types/Types";
// import {abilities} from "../Models/Abilities";
// import {attacks} from "../Models/Attacks";
// import {currency} from '../Models/Currency';
// import {items} from '../Models/Items';
// import {leftColumnSkills, rightColumnSkills} from "../Models/Skills";
// import {limitedUses as limitedUsesModel} from "../Models/LimitedUses";
// import {passives} from "../Models/Passives";
// import {keyBy} from "lodash";
// import {character as character2} from "../Models/Character";
import {reduce} from "lodash";

// // TODO need to improve on this.
// // todo fix character2
// const initialState: IAppStore = {
//     abilities: keyBy(abilities, "id"),
//     attacks: keyBy(attacks, "id"),
//     header: {
//         character: character2,
//         remainingHealth: character2.maximumHealth
//     },
//     character: character2,
//     inventory: keyBy(items, "_id"),
//     limitedUses: keyBy(limitedUsesModel, "id"),
//     passives: keyBy(passives, "id"),
//     leftColumnSkills: keyBy(leftColumnSkills, "id"),
//     rightColumnSkills: keyBy(rightColumnSkills, "id"),
//     remainingLimitedUses: reduce(limitedUsesModel, (accumulator, currentValue) => { 
//         accumulator[currentValue.id] = currentValue.maxUses; 
//         return accumulator;
//       }, {}),
//     remainingItems: {},
//     remainingHealth: character2.maximumHealth,
//     currency,
//     currencyTabActive: true,
//     addNewItemExpanded: false
// }

// TODO need better typing for reducer state.
export const header = (state: any, action: Actions) => {
    console.log("Header reducer state:", state)
    const {remainingHealth, character} = state.header;
    switch (action.type) {
        // TODO: need to fix the variable names. Should not conflict. 
        case dndActions.DECREASE_HEALTH:
            const newHealth = remainingHealth > 0 ? remainingHealth - 1 : remainingHealth;
            return {remaingHealth: newHealth};
        case dndActions.INCREASE_HEALTH: 
            const newHealth2 = remainingHealth < character.maximumHealth ? remainingHealth + 1 : remainingHealth;
            return {remaingHealth: newHealth2};
        case dndActions.DECREASE_HEALTH_BY_10: 
            const newHealth3 = remainingHealth - 10 > 0 ? remainingHealth + 10 : 0;
            return {remaingHealth: newHealth3};
        case dndActions.INCREASE_HEALTH_BY_10:
            const newHealth4 = remainingHealth + 10 < character.maximumHealth ? remainingHealth + 10 : character.maximumHealth;
            return {remaingHealth: newHealth4}; 
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
            return state
    }
}

// TODO fix this any
export const limitedUses = (state: any, action: Actions) => {
    const {limitedUses, character} = state.limitedUses;
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

// TODO fix this any
export const inventory = (state : any, action: Actions) => {
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
    header,
    limitedUses,
    inventory
});