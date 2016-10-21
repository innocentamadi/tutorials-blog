import {combineReducers} from 'redux';
import ApolloClient, {createNetworkInterface} from 'apollo-client';

export const client = new ApolloClient({
  // networkInterface: createNetworkInterface('http://localhost:9000/graphql'),
});

const rootReducer = combineReducers({
  apollo: client.reducer(),
});

export default rootReducer;
