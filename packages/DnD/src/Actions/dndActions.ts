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

export const shortRest = () => ({
    type: dndActions.SHORT_REST,

});

export const longRest = () => ({
    type: dndActions.LONG_REST
});

export const decreaseLimitedUse = (id: number) => ({
    type: dndActions.DECREASE_LIMITED_USE,
    id
});

export const increaseLimitedUse = (id: number) => ({
    type: dndActions.INCREASE_LIMITED_USE,
    id
});

export const toogleInventoryTab = (inventoryActive: boolean) => ({
    type: dndActions.TOGGLE_INVENTORY_TAB,
    inventoryActive
});

export const deleteItem = (id: number) => ({
    type: dndActions.DELETE_ITEM,
    id
});

export const addItem = (id: number) => ({
    type: dndActions.ADD_ITEM,
    id
});

export const decreaseItem = (id: number) => ({
    type: dndActions.DECREASE_ITEM,
    id
});

export const increaseItem = (id: number) => ({
    type: dndActions.INCREASE_ITEM,
    id
});

// let nextTodoId = 0
// export const addTodo = text => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text
// })
// ​
// export const setVisibilityFilter = filter => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter
// })
// ​
// export const toggleTodo = id => ({
//   type: 'TOGGLE_TODO',
//   id
// })
// ​
// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }   