import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import { Provider } from 'react-redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
let store = createStore(
    reducers,
    applyMiddleware(logger, thunk)
);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
