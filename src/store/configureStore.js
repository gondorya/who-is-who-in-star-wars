import { createStore, combineReducers, applyMiddleware } from 'redux';
import {characterListReducer} from "./characterListReducer";
import thunk from 'redux-thunk'

export default () => {
    const store = createStore(
        combineReducers({
            characterListPerPage: characterListReducer,
        }),
        {},
        applyMiddleware(thunk)
    );

    return store;
};