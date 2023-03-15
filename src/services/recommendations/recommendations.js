// import axios from 'axios';
import genre from '../../assets/genre.json';

// async function getMovie() {
//     try {
//         const response = await axios.get(
//             'https://jsonplaceholder.typicode.com/posts'
//         );
//         console.log(response);
//     } catch (error) {
//         console.error(error);
//     }
// }

// Get twenty most rated films / tv shows
const results = genre.results
    .filter((i) => i.imDbRatingVotes !== null) // Filters null values
    .sort((a, b) => parseInt(b.imDbRatingVotes) - parseInt(a.imDbRatingVotes)) // Sort array by highest votes
    .slice(0, 20) // Get highest 20
    .sort((a, b) => parseFloat(b.imDbRating) - parseFloat(a.imDbRating)) // Sort array by highest rating
    .map((i) => i.id) // Get ids
    .slice(0, 10); // Get ten highest rated

results.forEach((i, index) => {
    console.log(index, i);
});

//getMovie();

function recommendations() {
    const data = { name: 'Get out' };
    return data;
}

export default recommendations;
