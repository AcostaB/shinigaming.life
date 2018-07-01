import { IAppStore } from './../Types/Types';
import {Actions, dndActions} from "../Actions/dndActions";
import {reduce} from "lodash";

import initialState from "../Models/InitialState";

// TODO need better types for the state.

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

const decreaseHealth = (state: IAppStore["remainingHealth"] = 0) => 
    state > 0 ? state - 1 : state;

// TODO deal with needing more that a single slice from state.
// const increaseHealth: Reducer<IAppStore["remainingHealth"]> = (state = 0) => {
const increaseHealth = (state: any) => {
    const {remainingHealth, character} = state;
    const newHealth = remainingHealth < character.maximumHealth ? remainingHealth + 1 : remainingHealth;
    return {...state, remaingHealth: newHealth};
};

const decreaseHealthBy10 = (state: IAppStore["remainingHealth"] = 0) => 
    state - 10 > 0 ? state + 10 : 0;


const increaseHealthBy10 = (state: any) => {
    const {remainingHealth, character} = state;
    const newHealth = remainingHealth + 10 < character.maximumHealth ? remainingHealth + 10 : character.maximumHealth;
    return {...state, remaingHealth: newHealth}; 
};

// TODO need one for recovering all health??

const shortRest = (state: any) => {
    const remainingLimitedUses = reduce(state.limitedUses, (accumulator, value) => {
        return accumulator[value.id] = value.shortRestRecover ? value.maxUses : state.remainingLimitedUses[value.id];
    }, {});
    return { ...state, remainingLimitedUses };
};

const longRest = (state: any) => {
    const remainingLimitedUses = reduce(state.limitedUses, (accumulator, value) => {
        return accumulator[value.id] = value.maxUses;
    }, {});
    return { ...state, remainingLimitedUses };
};

const decreaseLimitedUse = (state: IAppStore["remainingLimitedUses"], action: ReturnType<typeof Actions.decreaseLimitedUse>): IAppStore["remainingLimitedUses"] => {
    const newValue = state[action.payload] > 0 ? state[action.payload] - 1 : 0;
    return {...state, [action.payload]: newValue}
};

const increaseLimitedUse = (state: any, action: ReturnType<typeof Actions.increaseLimitedUse>) => {
    const { remainingLimitedUses } = state;
    const maxUses = state.limitedUses[action.payload].maxUses;
    const newValue2 = remainingLimitedUses[action.payload] < maxUses ? remainingLimitedUses[action.payload] + 1 : maxUses;

    return { ...state, remainingLimitedUses: {...remainingLimitedUses, [action.payload]: newValue2}}
};

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
export const healthReducer = (state : any, action: Actions) => {
    switch (action.type) {
    case dndActions.DECREASE_HEALTH : return decreaseHealth(state)
    case dndActions.INCREASE_HEALTH : return increaseHealth(state)
    case dndActions.DECREASE_HEALTH_BY_10 : return decreaseHealthBy10(state)
    case dndActions.INCREASE_HEALTH_BY_10 : return increaseHealthBy10(state)
        default:
            return state
    }
}

export const restReducer = (state : any, action: Actions) => {
    switch (action.type) {
        case dndActions.SHORT_REST : return shortRest(state)
        case dndActions.LONG_REST : return longRest(state)
        default:
            return state
    }
}

export const limitedUsesReducer = (state : any, action: Actions, limitedUses: IAppStore["limitedUses"]) => {
    switch (action.type) {
     case dndActions.DECREASE_LIMITED_USE : return decreaseLimitedUse(state, action)
     case dndActions.INCREASE_LIMITED_USE : return increaseLimitedUse(state, action)
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
    remainingHealth: healthReducer(state.remainingHealth, action),
    // b: restReducer(state.remainingHealth, action),
    remainingLimitedUses: limitedUsesReducer(state.remainingLimitedUses, action, state.limitedUses),
    remainingItems: inventoryReducer(state.inventory, action)
});