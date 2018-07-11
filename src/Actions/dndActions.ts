import {createAction} from "../Utils/Utils";
import {ActionsUnion} from "../Types/Types";

export enum dndActions {
    DECREASE_LIMITED_USE = "DECREASE_LIMITED_USE",
    INCREASE_LIMITED_USE = "INCREASE_LIMITED_USE",
    SHORT_REST = "SHORT_REST",
    LONG_REST = "LONG_REST",
    TOGGLE_INVENTORY_TAB = "TOGGLE_INVENTORY_TAB",
    ADD_ITEM = "ADD_ITEM",
    DELETE_ITEM = "DELETE_ITEM",
    DECREASE_ITEM = "DECREASE_ITEM",
    INCREASE_ITEM = "INCREASE_ITEM", 
    DECREASE_HEALTH = "DECREASE_HEALTH",
    INCREASE_HEALTH = "INCREASE_HEALTH",
    DECREASE_HEALTH_BY_10 = "DECREASE_HEALTH_BY_10",
    INCREASE_HEALTH_BY_10 = "INCREASE_HEALTH_BY_10"
}

// TODO: research this. Do I want payload to be an object or a simple type?
export const Actions = {
    decreaseLimitedUse: (id: number) => createAction(dndActions.DECREASE_LIMITED_USE, id),
    increaseLimitedUse: (id: number) => createAction(dndActions.INCREASE_LIMITED_USE, id),
    shortRest: () => createAction(dndActions.SHORT_REST),
    longRest: () => createAction(dndActions.LONG_REST),
    toogleInventoryTab: (inventoryActive: boolean) => createAction(dndActions.TOGGLE_INVENTORY_TAB, inventoryActive),
    deleteItem: (id: number) => createAction(dndActions.DELETE_ITEM, id),
    // TODO this needs more data. Description, count.
    addItem: (id: number) => createAction(dndActions.ADD_ITEM, id),
    decreaseItem: (id: number) => createAction(dndActions.DECREASE_ITEM, id),
    increaseItem: (id: number) => createAction(dndActions.INCREASE_ITEM, id),
    decreaseHealth: () => createAction(dndActions.DECREASE_HEALTH),
    increaseHealth: () => createAction(dndActions.INCREASE_HEALTH),
    decreaseHealthBy10: () => createAction(dndActions.DECREASE_HEALTH_BY_10),
    increaseHealthBy10: () => createAction(dndActions.INCREASE_HEALTH_BY_10)
}

export type Actions = ActionsUnion<typeof Actions>;