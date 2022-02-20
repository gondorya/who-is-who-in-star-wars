import { CHARACTER_LIST_FETCHED } from "./actionNames";

export const characterListReducer = (state = {}, {type, characters, page}) => {
    switch (type) {
        case CHARACTER_LIST_FETCHED:
            return {
                ...state,
                [page]: characters
            };
    }

    return state;
}
