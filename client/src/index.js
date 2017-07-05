import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import App from './App';

// Import default loading component provider and LoadingIndicator that will be used as a loading component
import DefaultLoadingComponentProvider from './routing/DefaultLoadingComponentProvider';
import LoadingIndicator from './components/LoadingIndicator';

// Import CSS reset and Global Styles
import './global-styles';

const history = createHistory();

// Create redux store with history
const store = configureStore({}, history);

ReactDOM.render(
  <Provider store={store}>
    <DefaultLoadingComponentProvider component={LoadingIndicator}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </DefaultLoadingComponentProvider>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
