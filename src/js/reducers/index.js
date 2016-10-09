import {combineReducers} from 'redux';
import tutorials from './tutorials/tutorialReducer';
import translations from './translations/translationReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import ApolloClient, {createNetworkInterface} from 'apollo-client';

export const client = new ApolloClient({
  // networkInterface: createNetworkInterface('http://localhost:9000/graphql'),
});

const rootReducer = combineReducers({
  tutorials,
  translations,
  ajaxCallsInProgress,
  apollo: client.reducer(),
});

export default rootReducer;
