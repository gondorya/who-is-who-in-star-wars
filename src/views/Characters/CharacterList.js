import React from "react";
import { Link } from "react-router-dom";

export const CharacterList = ({characterList, pageNumber}) => {
    return (
        <ul>
            {characterList.map((character) => (
                <li key={character.name}><Link
                    style={{ "marginRight": "5px" }}
                    to={`character/${character.id}`}
                >{character.name}</Link></li>
            ))}
        </ul>
    )
}