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

// TODO need to improve on this
const initialState: IAppStore = {
    abilities: keyBy(abilities, "id"),
    attacks: keyBy(attacks, "id"),
    inventory: keyBy(items, "_id"),
    limitedUses: keyBy(limitedUses, "id"),
    passives: keyBy(passives, "id"),
    leftColumnSkills: keyBy(leftColumnSkills, "id"),
    rightColumnSkills: keyBy(rightColumnSkills, "id"),
    remainingLimitedUses: reduce(limitedUses, (accumulator, currentValue) => { 
        accumulator[currentValue.id] = currentValue.maxUses; 
        return accumulator;
      }, {}),
    remainingItems: {},
    currency,
    currencyTabActive: true,
    addNewItemExpanded: false
}

const store: Store = createStore(rootReducer, initialState as any);
// , (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root') as HTMLElement
  );

registerServiceWorker();