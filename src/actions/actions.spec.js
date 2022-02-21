import { fetchCharacters, fetchFilms, fetchWorld } from "./actions";
import configureStore from 'redux-mock-store';
import * as api from "./api"
import thunk from 'redux-thunk'
import {
    CHARACTER_COUNT_FETCHED,
    CHARACTER_LIST_FETCHED,
    FILM_FETCHED,
    WORLD_FETCHED
} from "../store/actionNames";

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

jest.mock('./api');

describe("actions", () => {
    describe("fetchCharacters", () => {
        const characters = [
            {name: "C3PO"},
            {name: "Luke Skywalker"},
            {name: "Han Solo"}
        ];

        api.fetchCharacters.mockImplementation(jest.fn((() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                count: 345,
                results: characters,
            })
        }))));

        it("fetches characters from selected page", async () => {
            const initialState = {
                characterListPerPage: {},
                pagesCount: ""
            }
            const store = mockStore(() => initialState)

            return store.dispatch(fetchCharacters({page: 24})).then(() => {
                expect(api.fetchCharacters).toHaveBeenCalledWith({"page": 24});
            })
        });

        it("calls CHARACTER_COUNT_FETCHED action type with list of characters and number of pages", async () => {
            const initialState = {
                characterListPerPage: {},
                pagesCount: ""
            }
            const store = mockStore(() => initialState)

            return store.dispatch(fetchCharacters({page: 24})).then(() => {
                expect(store.getActions()).toEqual([
                    {
                        type: CHARACTER_COUNT_FETCHED,
                        countOfPages: 35,
                    },
                    {
                        type: CHARACTER_LIST_FETCHED,
                        characters: {
                            "24-0": {id: "24-0", name: "C3PO"},
                            "24-1": {id: "24-1", name: "Luke Skywalker"},
                            "24-2": {id: "24-2", name: "Han Solo"},
                        },
                        page: 24,
                    }
                ]);
            })
        });

        it("doesn't call actions from selected page if this page exists in store", async () => {
            const initialState = {
                characterListPerPage: {
                    24: {
                        "24-0": {id: "24-0", name: "Leia Organa"}
                    }
                },
                pagesCount: "20"
            }
            const store = mockStore(() => initialState)

            return store.dispatch(fetchCharacters({page: 24})).then(() => {
                expect(store.getActions()).toEqual([]);
            })
        });

        it("returns an error when request fails", () => {
            const initialState = {
                characterListPerPage: {},
                pagesCount: ""
            }
            api.fetchCharacters.mockImplementation(jest.fn((() => Promise.reject("Error"))));

            const store = mockStore(() => initialState)

            return store.dispatch(fetchCharacters({page: 24})).then((result) => {
                expect(result).toBe("Error");
            })
        })
    });

    describe("fetchFilms", () => {
        const films = {
            "film/1/": {
                title: "A New Hope",
                url: "film/1/"
            },
            "film/2/": {
                title: "The Force Awakens",
                url: "film/2/"
            }
        };

        it("calls FILM_FETCHED actions with films data", async () => {
            global.fetch = (promise) => Promise.resolve({
                ok: true,
                json: () => {
                    return Promise.resolve(films[promise])
                }
            });
            const initialState = {
                films: {}
            }
            const store = mockStore(() => initialState)

            return store.dispatch(fetchFilms(["film/1/", "film/2/"])).then(() => {
                expect(store.getActions()).toEqual([
                    {
                        type: FILM_FETCHED,
                        filmsData: {
                            "1": {
                                title: "A New Hope",
                                url: "film/1/"
                            },
                            "2": {
                                title: "The Force Awakens",
                                url: "film/2/"
                            }
                        }
                    }
                ]);
            })
        });

        it("returns an error when at least one request fails", () => {
            global.fetch = (promise) => Promise.resolve({
                ok: true,
                json: () => {
                    if(promise === "film/1/") {
                        return Promise.resolve(films[promise])
                    }

                    return Promise.reject("Error")
                }
            });
            const initialState = {
                films: {}
            }
            const store = mockStore(() => initialState)

            return store.dispatch(fetchFilms(["film/1/", "film/2/"])).then((result) => {
                expect(result).toBe("Error");
            })
        })
    });

    describe("fetchWorld", () => {
        it("calls WORLD_FETCHED actions with films data", async () => {
            global.fetch = () => Promise.resolve({
                ok: true,
                json: () => {
                    return Promise.resolve({name: "Earth"})
                }
            });
            const initialState = {
                worlds: {}
            }
            const store = mockStore(() => initialState)

            return store.dispatch(fetchWorld("world/6/")).then(() => {
                expect(store.getActions()).toEqual([
                    {
                        type: WORLD_FETCHED,
                        worldData: {
                            "name": "Earth"
                        },
                        worldIndex: "6",
                    }
                ]);
            })
        });

        it("returns an error when at least one request fails", () => {
            global.fetch = () => Promise.resolve({
                ok: true,
                json: () => Promise.reject("Error")

            });
            const initialState = {
                worlds: {}
            }
            const store = mockStore(() => initialState)

            return store.dispatch(fetchWorld("world/7/")).then((result) => {
                expect(result).toBe("Error");
            })
        })

    })
})