export const fetchCharacters = ({page}) => fetch(`https://swapi.dev/api/people?page=${page}`);