import {
    CHARACTER_LIST_FETCHED,
    CHARACTER_COUNT_FETCHED,
    WORLD_FETCHED,
    FILM_FETCHED} from "../store/actionNames";
import * as api from "./api"
import keyBy from "lodash/keyBy";
import { getItemIndex } from "../utils"

export const fetchCharacters = ({page} = {}) => (dispatch, getState) => {
    const cachedData = getState().characterListPerPage[page]
    const cachedCharacterCount = getState().characterCount;

    if (cachedData) {
        return Promise.resolve(cachedData);
    }

    return api.fetchCharacters({page}).then((response) => {
        if(response.ok) {
            return response.json()
        }
    }).then((data) => {
        const characters = keyBy(data.results.map((character, index) => ({
            ...character,
            id: `${page}-${index}`,
        })), "id")

        if(!cachedCharacterCount) {
            dispatch({
                type: CHARACTER_COUNT_FETCHED,
                countOfPages: Math.ceil(data.count / 10),
            })
        }
        dispatch({
            type: CHARACTER_LIST_FETCHED,
            characters,
            page,
        })
    }).catch((error) => {
       return  error;
    })
}


export const fetchWorld = (homeworld) =>  (dispatch, getState) => {
    const worldIndex = getItemIndex(homeworld);
    const cachedData = getState().worlds[worldIndex]
    if (cachedData) {
        return Promise.resolve(cachedData);
    } else {
        return fetch(homeworld).then((response) => {
            if(response.ok) {
                return response.json()
            }
        }).then((worldData) => (
            dispatch({
                type: WORLD_FETCHED,
                worldIndex,
                worldData
            })
        )).catch((error) => {
            return error;
        })
    }
}

export const fetchFilms = (films) =>  (dispatch, getState) => {
    const filmsPromises = films.map((film) => {
        const filmIndex = getItemIndex(film);
        const cachedData = getState().films[filmIndex]
        if (cachedData) {
            return Promise.resolve(cachedData);
        }
        return fetch(film).then((response) => {
            if(response.ok) {
                return response.json()
            }
        }).catch((error) => {
            throw error;
        })
    })

    return Promise.all(filmsPromises).then((films) => {
        const filmsData = films.reduce((obj, film) => ({
            ...obj,
            [getItemIndex(film.url)]: film
        }), [])

        dispatch({
            type: FILM_FETCHED,
            filmsData
        })
    }).catch((error) => {
        return error;
    })
};

export const fetchCharacterDetails = ({homeworld, films}) => (dispatch, getState) => {
    return Promise.all([
        dispatch(fetchFilms(films)),
        dispatch(fetchWorld(homeworld))
    ])
}
