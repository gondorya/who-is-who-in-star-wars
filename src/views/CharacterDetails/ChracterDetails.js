import React, {useEffect} from "react";
import { connect } from 'react-redux';
import {fetchCharacters} from "../../actions/actions"
import { useParams, Link } from "react-router-dom";

const CharacterDetails = ({fetchCharacters, characterList }) => {
    const {pageNumber, characterId} = useParams();
    const data = characterList[pageNumber]?.[characterId]
    useEffect(() => {
        fetchCharacters({page: pageNumber})
    }, [characterList])

    return (
        <div>
            <div>
                {data && <span>{data.name}</span>}
            </div>
            <Link to={`/page/${pageNumber}`}>Back to list</Link>
        </div>
    )
}

export default connect((state) =>({
    characterList: state.characterListPerPage,
}), {
    fetchCharacters,
})(CharacterDetails)