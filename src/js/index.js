import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/main.scss';
import 'font-awesome/css/font-awesome.css'
import configureStore from './store/configureStore';
import { loadData } from './utils/appInit';
import {client} from './reducers';

import { ApolloProvider } from 'react-apollo';

let store = configureStore();
loadData(store);

render (
  <ApolloProvider store={store} client={client} >
    <Router history={browserHistory} routes={routes} />
  </ApolloProvider>,
  document.getElementById('app')
);
