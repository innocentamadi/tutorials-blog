import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import {client} from '../reducers';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import {composeWithDevTools} from 'remote-redux-devtools';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant(), client.middleware()))
  )
}
