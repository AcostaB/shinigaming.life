import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import rootReducer from './Reducers/dndReducers';
import './index.css';
import initialState from "./Models/InitialState";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

const store: Store = createStore(rootReducer, initialState as any, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

console.log("Store state:", store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root') as HTMLElement
  );

registerServiceWorker();