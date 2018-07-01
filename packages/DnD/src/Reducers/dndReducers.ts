import { LimitedUse } from './../Models/LimitedUses';
import { IAppStore } from './../Types/Types';
import {Actions, dndActions} from "../Actions/dndActions";
import {mapValues} from "lodash";

import initialState from "../Models/InitialState";

// TODO need better types for this entire file.

// TODO fix this any and variable names. 
// function createReducer(initialState2: any, handlers: any) {
//     return function reducer(state = initialState2, action2: Actions) {
//         if (handlers.hasOwnProperty(action2.type)) {
//             return handlers[action2.type](state, action2)
//         } else {
//             return state
//         }
//     }
// }

const decreaseHealth = (state: IAppStore["remainingHealth"] = 0): IAppStore["remainingHealth"] => 
    state > 0 ? state - 1 : state;

// TODO deal with needing more that a single slice from state.
// const increaseHealth: Reducer<IAppStore["remainingHealth"]> = (state = 0) => {
const increaseHealth = (state: IAppStore["remainingHealth"] = 0, character: IAppStore["character"]): IAppStore["remainingHealth"] =>
    state < character.maximumHealth ? state + 1 : state;


const decreaseHealthBy10 = (state: IAppStore["remainingHealth"] = 0): IAppStore["remainingHealth"] => 
    state - 10 > 0 ? state + 10 : 0;


const increaseHealthBy10 = (state: IAppStore["remainingHealth"] = 0, character: IAppStore["character"]): IAppStore["remainingHealth"] =>
    state + 10 < character.maximumHealth ? state + 10 : character.maximumHealth;

const increaseHealthToMax = (state: IAppStore["character"]): IAppStore["remainingHealth"] => 
    state.maximumHealth

// const shortRest = (state: any) => {
//     const remainingLimitedUses = reduce(state.limitedUses, (accumulator, value) => {
//         return accumulator[value.id] = value.shortRestRecover ? value.maxUses : state.remainingLimitedUses[value.id];
//     }, {});
//     return { ...state, remainingLimitedUses };
// };

// const longRest = (state: any) => {
//     const remainingLimitedUses = reduce(state.limitedUses, (accumulator, value) => {
//         return accumulator[value.id] = value.maxUses;
//     }, {});
//     return { ...state, remainingLimitedUses };
// };

const decreaseLimitedUse = (state: IAppStore["remainingLimitedUses"], action: ReturnType<typeof Actions.decreaseLimitedUse>): IAppStore["remainingLimitedUses"] => {
    const newValue = state[action.payload] > 0 ? state[action.payload] - 1 : 0;
    return {...state, [action.payload]: newValue}
};

const increaseLimitedUse = (state: IAppStore["remainingLimitedUses"], action: ReturnType<typeof Actions.increaseLimitedUse>, limitedUses: IAppStore["limitedUses"]): IAppStore["remainingLimitedUses"] => {
    const maxUses = limitedUses[action.payload].maxUses;
    const newValue = state[action.payload] < maxUses ? state[action.payload] + 1 : maxUses;

    return { ...state, [action.payload]: newValue}
};

// TODO need to fix this. should not be a property called limited use inside limited uses. 
const shortRestRecoverLimitedUse = (state: IAppStore["remainingLimitedUses"], limitedUses: IAppStore["limitedUses"]): IAppStore["remainingLimitedUses"] =>
    mapValues(state, (value, index) => (limitedUses[index] as LimitedUse).shortRestRecover? (limitedUses[index] as LimitedUse).maxUses : value) as IAppStore["remainingLimitedUses"]

const longRestRecoverLimitedUse = (state: IAppStore["remainingLimitedUses"], limitedUses: IAppStore["limitedUses"]): IAppStore["remainingLimitedUses"] =>
    mapValues(state, (value, index) => (limitedUses[index] as LimitedUse).maxUses) as IAppStore["remainingLimitedUses"]


// Slice reducer
// const healthReducer = createReducer([], {
//     [dndActions.DECREASE_HEALTH] : decreaseHealth,
//     [dndActions.INCREASE_HEALTH] : increaseHealth,
//     [dndActions.DECREASE_HEALTH_BY_10] : decreaseHealthBy10,
//     [dndActions.INCREASE_HEALTH_BY_10] : increaseHealthBy10
// });

// Slice reducer
// const restReducer = createReducer([], {
//     [dndActions.SHORT_REST] : shortRest,
//     [dndActions.LONG_REST] : longRest
// });

// Slice reducer
// const limitedUsesReducer = createReducer([], {
//     [dndActions.DECREASE_LIMITED_USE] : decreaseLimitedUse,
//     [dndActions.INCREASE_LIMITED_USE] : increaseLimitedUse
// });

// TODO read more on this: https://daveceddia.com/how-does-redux-work/ @@redux

// TODO fix this any
export const healthReducer = (state: IAppStore["remainingHealth"], action: Actions, character: IAppStore["character"]) => {
    switch (action.type) {
    case dndActions.DECREASE_HEALTH : return decreaseHealth(state)
    case dndActions.INCREASE_HEALTH : return increaseHealth(state, character)
    case dndActions.DECREASE_HEALTH_BY_10 : return decreaseHealthBy10(state)
    case dndActions.INCREASE_HEALTH_BY_10 : return increaseHealthBy10(state, character)
    case dndActions.LONG_REST: return increaseHealthToMax(character)
        default:
            return state
    }
}

// export const restReducer = (state : any, action: Actions) => {
//     switch (action.type) {
//         case dndActions.SHORT_REST : return shortRest(state)
//         case dndActions.LONG_REST : return longRest(state)
//         default:
//             return state
//     }
// }

export const limitedUsesReducer = (state : any, action: Actions, limitedUses: IAppStore["limitedUses"]) => {
    switch (action.type) {
     case dndActions.DECREASE_LIMITED_USE : return decreaseLimitedUse(state, action)
     case dndActions.INCREASE_LIMITED_USE : return increaseLimitedUse(state, action, limitedUses)
     case dndActions.SHORT_REST: return shortRestRecoverLimitedUse(state, limitedUses)
     case dndActions.LONG_REST: return longRestRecoverLimitedUse(state, limitedUses)
        default:
            return state
    }
}

export const inventoryReducer = (state : any, action: Actions) => {
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

export default (state: IAppStore = initialState, action: Actions): IAppStore => ({
    ...state,
    remainingHealth: healthReducer(state.remainingHealth, action, state.character),
    // b: restReducer(state.remainingHealth, action),
    remainingLimitedUses: limitedUsesReducer(state.remainingLimitedUses, action, state.limitedUses),
    remainingItems: inventoryReducer(state.inventory, action)
});