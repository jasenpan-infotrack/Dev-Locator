import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';

import App from "./components/App";
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
};