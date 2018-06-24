import App from './App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import rootReducer from './Reducers/dndReducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import {IAppStore} from "./Types/Types";
import {abilities} from "./Models/Abilities";
import {attacks} from "./Models/Attacks";
import {currency} from "./Models/Currency";
import {items} from './Models/Items';
import {leftColumnSkills, rightColumnSkills} from "./Models/Skills";
import {limitedUses} from "./Models/LimitedUses";
import {passives} from "./Models/Passives";
import {keyBy, reduce} from "lodash";
import {character as characterModel} from "./Models/Character";


// TODO: figure out how to structure this data. Normalize? Object with IDs as keys?
// TODO Improve on this.
const initialState: IAppStore = {
  // Header component
  header: {
      character: characterModel,
      remainingHealth: characterModel.maximumHealth
  },
  // Abilities Panel
  abilities: {
      abilities:  keyBy(abilities, "id")
  },
  // Attacks Panel
  attacks: {
      attacks: keyBy(attacks, "id")
  },
  // Passives panel
  passives: {
      passives: keyBy(passives, "id")
  },
  // Limited Uses Panel
  limitedUses: {
      limitedUses: keyBy(limitedUses, "id"),
      remainingLimitedUses: reduce(limitedUses, (accumulator, currentValue) => { 
        accumulator[currentValue.id] = currentValue.maxUses; 
        return accumulator;
      }, {})
  },
  // Skills panel
  skills: {
    leftColumnSkills: keyBy(leftColumnSkills, "id"),
    rightColumnSkills: keyBy(rightColumnSkills, "id")
  },
  // Inventory Panel
  inventory: {
    inventory: keyBy(items, "_id"),
    remainingItems: {},
    currency,
    currencyTabActive: true,
    addNewItemExpanded: false
  }
}

const store: Store = createStore(rootReducer, initialState as any, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
// , (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()

console.log("Store state:", store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root') as HTMLElement
  );

registerServiceWorker();