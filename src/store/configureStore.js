import { createStore, combineReducers, applyMiddleware } from 'redux';
import { characterListReducer } from "./characterListReducer";
import { pagesCountReducer } from "./pagesCountReducer";
import { worldsReducer } from "./worldsReducer";
import { filmsReducer } from "./filmsReducer";
import thunk from 'redux-thunk'

export default () => {
    const store = createStore(
        combineReducers({
            characterListPerPage: characterListReducer,
            pagesCount: pagesCountReducer,
            worlds: worldsReducer,
            films: filmsReducer,
        }),
        {},
        applyMiddleware(thunk)
    );

    return store;
};