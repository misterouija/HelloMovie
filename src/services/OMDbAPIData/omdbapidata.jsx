import { useEffect } from 'react';

const OMDbAPIData = () => {

const [movies, setMovies] = useState([]);
const [searchValue, setSearchValue] = useState('');

const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
        setMovies(responseJson.Search);
    }
};

useEffect(() => {
    getMovieRequest(searchValue);
}, [searchValue]);

}

export default OMDbAPIData;