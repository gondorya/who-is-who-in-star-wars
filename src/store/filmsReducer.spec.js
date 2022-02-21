import { filmsReducer } from "./filmsReducer";
import { FILM_FETCHED } from "./actionNames";

describe("filmsReducer", () => {
    it("adds films to store on FILM_FETCHED action type", () => {
        const state = {
            "4": {title: "A New Hope"},
        }

        const action = {
            type: FILM_FETCHED,
            filmsData: {
                "2": {title: "Attack of the Clones"},
                "5": {title: "The Empire Strikes Back"}
            }
        };

        const nextState = filmsReducer(state, action);

        expect(nextState).toEqual({
            "4": {title: "A New Hope"},
            "2": {title: "Attack of the Clones"},
            "5": {title: "The Empire Strikes Back"}
        });
    })
})