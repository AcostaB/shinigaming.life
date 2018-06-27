import {Actions, dndActions} from "../Actions/dndActions";
import {reduce} from "lodash";

import initialState from "../Models/InitialState";

// TODO need better types for the state.

// TODO fix this any and variable names. 
function createReducer(initialState2: any, handlers: any) {
    return function reducer(state = initialState2, action2: Actions) {
        if (handlers.hasOwnProperty(action2.type)) {
            return handlers[action2.type](state, action2)
        } else {
            return state
        }
    }
}

const decreaseHealth = (state: any = initialState, action: Actions) => {
    const {remainingHealth} = state;
    const newHealth = remainingHealth > 0 ? remainingHealth - 1 : remainingHealth;
    return {...state, remaingHealth: newHealth};
};

const increaseHealth = (state: any = initialState, action: Actions) => {
    const {remainingHealth, character} = state;
    const newHealth = remainingHealth < character.maximumHealth ? remainingHealth + 1 : remainingHealth;
    return {...state, remaingHealth: newHealth};
};

const decreaseHealthBy10 = (state: any = initialState, action: Actions) => {
    const {remainingHealth} = state;
    const newHealth = remainingHealth - 10 > 0 ? remainingHealth + 10 : 0;
    return {...state, remaingHealth: newHealth};
};

const increaseHealthBy10 = (state: any = initialState, action: Actions) => {
    const {remainingHealth, character} = state;
    const newHealth = remainingHealth + 10 < character.maximumHealth ? remainingHealth + 10 : character.maximumHealth;
    return {...state, remaingHealth: newHealth}; 
};

// TODO need one for recovering all health??

const shortRest = (state: any = initialState, action: Actions) => {
    const remainingLimitedUses = reduce(state.limitedUses, (accumulator, value) => {
        return accumulator[value.id] = value.shortRestRecover ? value.maxUses : state.remainingLimitedUses[value.id];
    }, {});
    return { ...state, remainingLimitedUses };
};

const longRest = (state: any = initialState, action: Actions) => {
    const remainingLimitedUses = reduce(state.limitedUses, (accumulator, value) => {
        return accumulator[value.id] = value.maxUses;
    }, {});
    return { ...state, remainingLimitedUses };
};

const decreaseLimitedUse = (state: any = initialState, action: Actions) => {
    const { remainingUses } = state;
    const newValue = remainingUses[action.payload] > 0 ? remainingUses[action.payload] - 1 : 0;
    return {...state, remainingLimitedUses: {...remainingUses, [action.payload]: newValue}}
};

const test: Actions = {
    type: dndActions.DECREASE_LIMITED_USE,
    payload: 413
}

console.log("Something", test);

const increaseLimitedUse = (state: any = initialState, action: Actions) => {
    const { remainingUses } = state;
    const maxUses = state.limitedUses[action.payload].maxUses;
    const newValue2 = remainingUses[action.payload] < maxUses ? remainingUses[action.payload] + 1 : maxUses;

    return { ...state, remainingUses: {...remainingUses, [action.payload]: newValue2}}
};

// Slice reducer
const healthReducer = createReducer([], {
    [dndActions.DECREASE_HEALTH] : decreaseHealth,
    [dndActions.INCREASE_HEALTH] : increaseHealth,
    [dndActions.DECREASE_HEALTH_BY_10] : decreaseHealthBy10,
    [dndActions.INCREASE_HEALTH_BY_10] : increaseHealthBy10
});

// Slice reducer
const restReducer = createReducer([], {
    [dndActions.SHORT_REST] : shortRest,
    [dndActions.LONG_REST] : longRest
});

// Slice reducer
const limitedUsesReducer = createReducer([], {
    [dndActions.DECREASE_LIMITED_USE] : decreaseLimitedUse,
    [dndActions.INCREASE_LIMITED_USE] : increaseLimitedUse
});

// TODO read more on this: https://daveceddia.com/how-does-redux-work/ @@redux

// TODO fix this any
// export const inventory = (state : any = initialState, action: Actions) => {
//     switch (action.type) {
//         case dndActions.TOGGLE_INVENTORY_TAB:  
//         case dndActions.DELETE_ITEM: 
//         case dndActions.ADD_ITEM: 
//         case dndActions.DECREASE_ITEM: 
//         case dndActions.INCREASE_ITEM: 
//         default:
//             return state
//     }
// }

export default (state: any, action: Actions) => ({
    a: healthReducer(state.remainingHealth, action),
    b: restReducer(state.remainingHealth, action),
    c: limitedUsesReducer(state.limitedUses, action)
});