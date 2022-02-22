import React from "react";
import { Link } from "react-router-dom";
import { Stack, Box } from "@mui/material";

export const CharacterList = ({characterList, pageNumber}) => {
    return (
            <Stack spacing={2}>
                {characterList.map((character) => (
                    <Link
                        key={character.name}
                        style={{ marginRight: "5px", textDecoration: "none" }}
                        to={`character/${character.id}`}
                    >
                        <Box
                            sx={{
                                bgcolor: "background.paper",
                                padding: "20px",
                                borderRadius: "4px",
                                textDecoration: "none",
                                color: "text.primary",
                                transition: "all 0.3s linear",
                                ":hover": {
                                    bgcolor: "secondary.main",
                                    color: "common.white",
                                }
                            }}
                            >
                            {character.name}
                        </Box>
                    </Link>
                ))}
            </Stack>

    )
}