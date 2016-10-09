import {combineReducers} from 'redux';
import proverbs from './proverbs/proverbReducer';
import translations from './translations/translationReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import ApolloClient, {createNetworkInterface} from 'apollo-client';

export const client = new ApolloClient({
  // networkInterface: createNetworkInterface('http://localhost:9000/graphql'),
});

const rootReducer = combineReducers({
  proverbs,
  translations,
  ajaxCallsInProgress,
  apollo: client.reducer(),
});

export default rootReducer;
