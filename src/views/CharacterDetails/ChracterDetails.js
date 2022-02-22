import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import { fetchCharacters, fetchCharacterDetails } from "../../actions/actions"
import { useParams, Link } from "react-router-dom";
import { Stack, Box, Container, Button } from "@mui/material";
import { getItemIndex } from "../../utils";

const CharacterDetails = ({fetchCharacters, fetchCharacterDetails, characterList, worlds, films }) => {
    const {pageNumber, characterId} = useParams();
    const [worldData, setWorldData] = useState({});
    const [filmsData, setFilmsData] = useState([]);
    const data = characterList[pageNumber]?.[characterId]
    useEffect(() => {
        fetchCharacters({page: pageNumber}).then(() => {
            if(data) {
                fetchCharacterDetails(data)
            }
        })

    }, [characterList, data])

    useEffect(() => {
        if(data) {
            setWorldData(worlds[getItemIndex(data.homeworld)])
            const characterFilms = Object.values(films).filter((film) => data.films.includes(film.url));
            setFilmsData(characterFilms);
        }
    }, [data, films, worlds])

    const rowStyles = {
        padding: "5px",
        border: "1px solid",
        borderTop: "0",
        borderColor: "common.white",
        textDecoration: "none",
        color: "common.white",
    }

    return (
                <Container
                    maxWidth={"md"}
                    sx={{
                        backgroundColor: "primary.light",
                        padding: "40px 20px",
                        borderRadius: "4px"
                    }}
                >
                    <Link
                        to={`/page/${pageNumber}`}
                        style={{textDecoration: "none"}}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                        >Back to list</Button>
                    </Link>
                        <Stack>
                            <Box sx={{margin: "20px 0"}}>
                                {(data && worldData && !!filmsData.length) ?
                                    <>
                                        <Stack direction="row" sx={{...rowStyles, borderTop: "1px solid"}}>
                                            <Box width="30%">
                                                Name:
                                            </Box>
                                            <Box width="70%">
                                                {data.name}
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" sx={rowStyles}>
                                            <Box width="30%">
                                                Birth year:
                                            </Box>
                                            <Box width="70%">
                                                {data.birth_year}
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" sx={rowStyles}>
                                            <Box width="30%">
                                                Gender:
                                            </Box>
                                            <Box width="70%">
                                                {data.gender}
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" sx={rowStyles}>
                                            <Box width="30%">
                                                Height:
                                            </Box>
                                            <Box width="70%">
                                                {data.height}
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" sx={rowStyles}>
                                            <Box width="30%">
                                                Home world:
                                            </Box>
                                            <Box width="70%">
                                                {worldData.name}
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" sx={rowStyles}>
                                            <Box width="30%">
                                                Films:
                                            </Box>
                                            <Box width="70%">
                                                <Stack>
                                                    {filmsData.map((film) => (
                                                        <span key={film.title}>{film.title}</span>
                                                    ))}
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </>
                                : "Loading..." }
                            </Box>
                        </Stack>
                </Container>
    )
}

export default connect((state) =>({
    characterList: state.characterListPerPage,
    worlds: state.worlds,
    films: state.films,
}), {
    fetchCharacters,
    fetchCharacterDetails,
})(CharacterDetails)