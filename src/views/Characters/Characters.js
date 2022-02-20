import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { fetchCharacters } from "../../actions/actions"
import { CharacterList } from "./CharacterList";
import { useParams, Link } from "react-router-dom";
import { Container, Box, Button, Stack } from "@mui/material";


const Characters = ({fetchCharacters, characterList, pagesCount}) => {
    const {pageNumber} = useParams();
    const [inProgress, setInProgress] = useState(true);
    const [currentPage, setCurrentPage] = useState(Number(pageNumber));
    useEffect(() => {
        fetchCharacters({page: currentPage}).then(() => setInProgress(false))
    }, [currentPage])

    return (
    <Container
        maxWidth={"sm"}
        sx={{
            backgroundColor: 'primary.light',
            padding: "40px 20px",
            borderRadius: "4px"
        }}
    >
        <Box>
            {inProgress ?
                "Loading data..." :
                <CharacterList characterList={Object.values(characterList[currentPage])}/>
            }
            <Stack sx={{marginTop: "20px"}} direction="row" justifyContent="space-between">
                <Link
                    style={{ "marginRight": "5px", "textDecoration": "none", "pointerEvents": pageNumber === "1" ? "none" : "auto" }}
                    to={`/page/${currentPage - 1}`}
                >
                    <Button
                        disabled={pageNumber === "1"}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setInProgress(true);
                            setCurrentPage((prevState => prevState - 1))
                        }}
                    >
                        prev
                    </Button>
                </Link>
                <Link
                    style={{
                        "textDecoration": "none",
                        "pointerEvents": pageNumber === pagesCount ? "none" : "auto"
                    }}
                    to={`/page/${currentPage + 1}`}
                >
                    <Button
                        disabled={pageNumber === pagesCount}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setInProgress(true);
                            setCurrentPage((prevState => prevState + 1))
                        }}
                    >
                        next
                    </Button>
                </Link>
            </Stack>
        </Box>
    </Container>
    );
}

export default connect((state) =>({
    characterList: state.characterListPerPage,
    pagesCount: state.pagesCount,
}), {
    fetchCharacters,
})(Characters)