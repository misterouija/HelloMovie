import axios from 'axios';

const OMDbAPIData = (props) => {

const getMovieRequest = async (searchValue) => {
 const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    const response = await axios.get(url);

    if (response) {
        console.table(response.data.Search)
     }
};
getMovieRequest(props.search)
}


export default OMDbAPIData