import { characterListReducer } from "./characterListReducer";
import { CHARACTER_LIST_FETCHED } from "./actionNames";

describe("characterListReducer", () => {
    it("sets new page of characters on CHARACTER_LIST_FETCHED action type", () => {
        const state = {
            "1": {
                "1-0": {name: "Luke Skywalker"},
                "1-2": {name: "Boba Fett"}
            },
        }

        const action = {
            type: CHARACTER_LIST_FETCHED,
            page: 5,
            characters: {
                "5-0": {name: "AR2D2"}
            }
        };

        const nextState = characterListReducer(state, action);

        expect(nextState).toEqual({
            "1": {
                "1-0": {name: "Luke Skywalker"},
                "1-2": {name: "Boba Fett"}
            },
            "5": {
                "5-0": {name: "AR2D2"}
            },
        });


    })
})