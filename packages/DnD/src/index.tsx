import App from './App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import rootReducer from './Reducers/dndReducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store: Store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root') as HTMLElement
  );

registerServiceWorker();