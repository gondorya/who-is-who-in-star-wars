import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import {fetchCharacters} from "../../actions/actions"
import {CharacterList} from "./CharacterList";
import { useParams, Link } from "react-router-dom";


const Characters = ({fetchCharacters, characterList}) => {
    const {pageNumber} = useParams();
    const [inProgress, setInProgress] = useState(true);
    const [currentPage, setCurrentPage] = useState(Number(pageNumber));
    useEffect(() => {
        fetchCharacters({page: currentPage}).then(() => setInProgress(false))
    }, [currentPage])

    return <div>
        {inProgress ? "Loading data..." : <CharacterList characterList={Object.values(characterList[currentPage])}/>}
        <Link
            onClick={() => {
                setInProgress(true);
                setCurrentPage((prevState => prevState - 1))
            }}
            style={{ "margin-right": "5px" }}
            to={`/page/${currentPage - 1}`}
        >
            prev
        </Link>
        <Link
            onClick={() => {
                setInProgress(true);
                setCurrentPage((prevState => prevState + 1))
            }}
            to={`/page/${currentPage + 1}`}
        >
            next
        </Link>
    </div>;
}

export default connect((state) =>({
    characterList: state.characterListPerPage,
}), {
    fetchCharacters,
})(Characters)