import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { combineReducers, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import {applyMiddleware} from 'redux';

import userReducer from './store/reducers/user.ts';

import {
  BrowserRouter as Router,
} from "react-router-dom";

const rootReducer = combineReducers({
  usr: userReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
