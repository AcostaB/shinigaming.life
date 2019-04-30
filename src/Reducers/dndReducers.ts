import { LimitedUse } from "./../Models/LimitedUses";
import { AppStore } from "./../Types/Types";
import { Actions, dndActions } from "../Actions/dndActions";
import { mapValues } from "lodash";

import initialState from "../Models/InitialState";

const decreaseHealth = (
  state: AppStore["remainingHealth"] = 0
): AppStore["remainingHealth"] => (state > 0 ? state - 1 : state);

const increaseHealth = (
  state: AppStore["remainingHealth"] = 0,
  character: AppStore["character"]
): AppStore["remainingHealth"] =>
  state < character.maximumHealth ? state + 1 : state;


const decreaseHealthBy10 = (
  state: AppStore["remainingHealth"] = 0
): AppStore["remainingHealth"] => (state - 10 > 0 ? state - 10 : 0);

const increaseHealthBy10 = (
  state: AppStore["remainingHealth"] = 0,
  character: AppStore["character"]
): AppStore["remainingHealth"] =>
  state + 10 < character.maximumHealth ? state + 10 : character.maximumHealth;

const increaseHealthToMax = (
  state: AppStore["character"]
): AppStore["remainingHealth"] => state.maximumHealth;

const decreaseLimitedUse = (
  state: AppStore["remainingLimitedUses"],
  action: ReturnType<typeof Actions.decreaseLimitedUse>
): AppStore["remainingLimitedUses"] => {
  const newValue = state[action.payload] > 0 ? state[action.payload] - 1 : 0;
  return { ...state, [action.payload]: newValue };
};

const increaseLimitedUse = (
  state: AppStore["remainingLimitedUses"],
  action: ReturnType<typeof Actions.increaseLimitedUse>,
  limitedUses: AppStore["limitedUses"]
): AppStore["remainingLimitedUses"] => {
  const maxUses = limitedUses[action.payload].maxUses;
  const newValue =
    state[action.payload] < maxUses ? state[action.payload] + 1 : maxUses;

  return { ...state, [action.payload]: newValue };
};

const shortRestRecoverLimitedUse = (
  state: AppStore["remainingLimitedUses"],
  limitedUses: AppStore["limitedUses"]
): AppStore["remainingLimitedUses"] =>
  mapValues(
    state,
    (value, index) =>
      (limitedUses[index] as LimitedUse).shortRestRecover
        ? (limitedUses[index] as LimitedUse).maxUses
        : value
  ) as AppStore["remainingLimitedUses"];

const longRestRecoverLimitedUse = (
  state: AppStore["remainingLimitedUses"],
  limitedUses: AppStore["limitedUses"]
): AppStore["remainingLimitedUses"] =>
  mapValues(
    state,
    (value, index) => (limitedUses[index] as LimitedUse).maxUses
  ) as AppStore["remainingLimitedUses"];

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

export const healthReducer = (
  state: AppStore["remainingHealth"],
  action: Actions,
  character: AppStore["character"]
) => {
  switch (action.type) {
    case dndActions.DECREASE_HEALTH:
      return decreaseHealth(state);
    case dndActions.INCREASE_HEALTH:
      return increaseHealth(state, character);
    case dndActions.DECREASE_HEALTH_BY_10:
      return decreaseHealthBy10(state);
    case dndActions.INCREASE_HEALTH_BY_10:
      return increaseHealthBy10(state, character);
    case dndActions.LONG_REST:
      return increaseHealthToMax(character);
    default:
      return state;
  }
};

export const limitedUsesReducer = (
  state: AppStore["remainingLimitedUses"],
  action: Actions,
  limitedUses: AppStore["limitedUses"]
) => {
  switch (action.type) {
    case dndActions.DECREASE_LIMITED_USE:
      return decreaseLimitedUse(state, action);
    case dndActions.INCREASE_LIMITED_USE:
      return increaseLimitedUse(state, action, limitedUses);
    case dndActions.SHORT_REST:
      return shortRestRecoverLimitedUse(state, limitedUses);
    case dndActions.LONG_REST:
      return longRestRecoverLimitedUse(state, limitedUses);
    default:
      return state;
  }
};

export const inventoryReducer = (state: any, action: Actions) => {
  switch (action.type) {
    case dndActions.TOGGLE_INVENTORY_TAB:
    case dndActions.DELETE_ITEM:
    case dndActions.ADD_ITEM:
    case dndActions.DECREASE_ITEM:
    case dndActions.INCREASE_ITEM:
    default:
      return state;
  }
};

export default (
  state: AppStore = initialState,
  action: Actions
): AppStore => ({
  ...state,
  remainingHealth: healthReducer(
    state.remainingHealth,
    action,
    state.character
  ),
  remainingLimitedUses: limitedUsesReducer(
    state.remainingLimitedUses,
    action,
    state.limitedUses
  ),
  remainingItems: inventoryReducer(state.inventory, action)
});
