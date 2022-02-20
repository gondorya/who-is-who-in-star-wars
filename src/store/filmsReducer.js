import { FILM_FETCHED } from "./actionNames";

export const filmsReducer = (state = {}, {type, filmsData}) => {
    switch (type) {
        case FILM_FETCHED:
            return {
                ...state,
                ...filmsData,
            };
    }

    return state;
}