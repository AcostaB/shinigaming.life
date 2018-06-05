import {dndActions} from "../Actions/dndActions";

export const restReducer = (state = [], action: string) => {
    switch (action) {
        case dndActions.SHORT_REST:

        case dndActions.LONG_REST: 

        case dndActions.DECREASE_LIMITED_USE: 

        case dndActions.INCREASE_LIMITED_USE: 

        case dndActions.TOGGLE_INVENTORY_TAB: 

    }
}

export const limitedUsesReducer = (state = [], action: string) => {
    switch (action) {

        case dndActions.DECREASE_LIMITED_USE: 

        case dndActions.INCREASE_LIMITED_USE: 

        case dndActions.TOGGLE_INVENTORY_TAB: 

    }
}

export const inventoryReducer = (state = [], action: string) => {
    switch (action) {

        case dndActions.TOGGLE_INVENTORY_TAB: 
        case dndActions.DELETE_ITEM: 
        case dndActions.ADD_ITEM: 
        case dndActions.DECREASE_ITEM: 
        case dndActions.INCREASE_ITEM: 

    }
}

// const todos = (state = [], action) => {
//     switch (action.type) {
//       case 'ADD_TODO':
//         return [
//           ...state,
//           {
//             id: action.id,
//             text: action.text,
//             completed: false
//           }
//         ]
//       case 'TOGGLE_TODO':
//         return state.map(todo =>
//           (todo.id === action.id)
//             ? {...todo, completed: !todo.completed}
//             : todo
//         )
//       default:
//         return state
//     }
//   }
//   ​
//   export default todos;