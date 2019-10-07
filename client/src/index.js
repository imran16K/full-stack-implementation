//redux setup
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
//provider api makes redux store available to any nested components that have been
//wrapped in the connect function
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//creating new instance of redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


ReactDOM.render(
    //passing store to provider, child to provider will be app component
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);

