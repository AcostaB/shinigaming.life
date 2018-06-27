import App from './App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import rootReducer from './Reducers/dndReducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import initialState from "./Models/InitialState";


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