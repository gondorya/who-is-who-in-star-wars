import {CHARACTER_LIST_FETCHED} from "../store/actionNames";
import * as api from "./api"
import keyBy from "lodash/keyBy";

export const fetchCharacters = ({page} = {}) => (dispatch, getState) => {
    const cachedData = getState().characterListPerPage[page]
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
        dispatch({
            type: CHARACTER_LIST_FETCHED,
            characters,
            page,
        })
    })
}