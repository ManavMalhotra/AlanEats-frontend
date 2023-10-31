import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { rootReducer } from './redux/reducers/rootReducer';
import { SnackbarProvider } from 'notistack';

let myStore = createStore(rootReducer);

ReactDOM.render(
  <Router>
    <Provider store={myStore}>
      <SnackbarProvider maxSnack={1}>
        <App />
      </SnackbarProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
);

