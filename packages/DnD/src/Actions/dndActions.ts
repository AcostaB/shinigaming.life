import {createAction} from "../Utils/Utils";
import {ActionsUnion} from "../Types/Types";

export enum dndActions {
    SHORT_REST = "SHORT_REST",
    LONG_REST = "LONG_REST",
    DECREASE_LIMITED_USE = "DECREASE_LIMITED_USE",
    INCREASE_LIMITED_USE = "INCREASE_LIMITED_USE",
    TOGGLE_INVENTORY_TAB = "TOGGLE_INVENTORY_TAB",
    ADD_ITEM = "ADD_ITEM",
    DELETE_ITEM = "DELETE_ITEM",
    DECREASE_ITEM = "DECREASE_ITEM",
    INCREASE_ITEM = "INCREASE_ITEM"
}

export const Actions = {
    shortRest: () => createAction(dndActions.SHORT_REST),
    longRest: () => createAction(dndActions.LONG_REST),
    decreaseLimitedUse: (id: number) => createAction(dndActions.DECREASE_LIMITED_USE, id),
    increaseLimitedUse: (id: number) => createAction(dndActions.INCREASE_LIMITED_USE, id),
    toogleInventoryTab: (inventoryActive: boolean) => createAction(dndActions.TOGGLE_INVENTORY_TAB, inventoryActive),
    deleteItem: (id: number) => createAction(dndActions.DELETE_ITEM, id),
    // TODO this needs more data. Description, count.
    addItem: (id: number) => createAction(dndActions.ADD_ITEM, id),
    decreaseItem: (id: number) => createAction(dndActions.DECREASE_ITEM, id),
    increaseItem: (id: number) => createAction(dndActions.INCREASE_ITEM, id)
}

export type Actions = ActionsUnion<typeof Actions>;