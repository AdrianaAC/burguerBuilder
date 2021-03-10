import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from 'react-redux';
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import burguerBuilderReducer from "./store/reducers/burguerBuilder";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  burguerBuilderReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));

const app = (
 <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
</Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
