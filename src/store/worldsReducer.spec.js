import { worldsReducer } from "./worldsReducer";
import { WORLD_FETCHED } from "./actionNames";

describe("worldsReducer", () => {
    it("adds world to store on WORLD_FETCHED action type", () => {
        const state = {
            "2" : { name: "Venus" },
        }

        const action = {
            type: WORLD_FETCHED,
            worldData: { name: "Mars" },
            worldIndex: "4"
        };

        const nextState = worldsReducer(state, action);

        expect(nextState).toEqual({
            "2": { name: "Venus" },
            "4": { name: "Mars" }
        });
    })
})