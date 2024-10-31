/* global window, document */
if (!window._babelPolyfill) {
  require("@babel/polyfill");
}

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";
import reducers from "./redux/reducers";
import rootSaga from "./redux/sagas";
import Admin from "./containers/Admin.jsx";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    ...reducers
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    <Provider store={store}>
      <Admin rsfObject={window.rsf_obj} />
    </Provider>,
    document.getElementById("rx-insta-feed-admin")
  );
});
