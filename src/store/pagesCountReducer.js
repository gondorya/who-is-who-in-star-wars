import { CHARACTER_COUNT_FETCHED } from "./actionNames";

export const pagesCountReducer = (state = "", {type, countOfPages}) => {
    switch (type) {
        case CHARACTER_COUNT_FETCHED:
            return countOfPages.toString();
    }

    return state;
}