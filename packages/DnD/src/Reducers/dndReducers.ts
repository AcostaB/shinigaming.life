import {dndActions} from "../Actions/dndActions";
import {Action} from "redux";
// import {}

export const restReducer = (state : any, action: Action) => {
    switch (action.type as dndActions) {
        case dndActions.SHORT_REST:
            return 
        case dndActions.LONG_REST: 

    }
}

export const limitedUsesReducer = (state: any, action: string) => {
    switch (action) {

        case dndActions.DECREASE_LIMITED_USE: 

        case dndActions.INCREASE_LIMITED_USE: 

    }
}

export const inventoryReducer = (state : any, action: string) => {
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