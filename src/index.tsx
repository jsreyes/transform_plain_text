import './index.css';

// import createHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// Importando redux
import { Provider } from 'react-redux'
// Importando React router
import { Router } from 'react-router'
import { applyMiddleware, combineReducers, createStore  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk';
import history from './history';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import service from './service';
import * as reducers from './thunks';

// Creando el store para pasarle al provider
const store = createStore(combineReducers({
 ...reducers,
 form: formReducer
}), composeWithDevTools(
 applyMiddleware(thunk)
))

ReactDOM.render(
 <Provider store={store}>
  <Router history={history}>
   <App history={history}/>
  </Router>
 </Provider>

 , document.getElementById('root') as HTMLElement
);
registerServiceWorker();
