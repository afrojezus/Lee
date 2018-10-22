/* import firebase from 'firebase';
import createHistory from 'history/createBrowserHistory';
import {
  firebaseReducer,
  getFirebase,
  reactReduxFirebase
} from 'react-redux-firebase';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { leenet } from '../config.json';

const rrfConfig = {
  userProfile: 'users',
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions', // where list of user sessions is stored in database (presence must be enabled)
  enableLogging: true
};

firebase.initializeApp(leenet);

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  thunk.withExtraArgument(getFirebase),
  routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window as any;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  routing: routerReducer
});

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  applyMiddleware(...middleware),
  ...enhancers
)(createStore);

const store: any = createStoreWithFirebase(rootReducer, initialState);

export default store; */
