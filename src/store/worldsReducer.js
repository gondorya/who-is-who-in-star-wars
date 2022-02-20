import { WORLD_FETCHED } from "./actionNames";

export const worldsReducer = (state = {}, {type, worldData, worldIndex}) => {
    switch (type) {
        case WORLD_FETCHED:
            return {
                ...state,
                [worldIndex]: worldData
            };
    }

    return state;
}