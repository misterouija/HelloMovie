import axios from 'axios';
import apikey from './apikeys';

import { useEffect, useState } from 'react';

function Recommendations() {
    const genres = 'comedy, drama';
    const genreSearchURL = `https://imdb-api.com/API/AdvancedSearch/${apikey}/?genres=${genres}`;
    const [data, setData] = useState('');

    useEffect(() => {
        getSimilarGeners();
    }, [data]);

    // Fetch data and get similar genres
    async function getSimilarGeners() {
        try {
            const response = await axios.get(genreSearchURL);
            const ratingsUrlArray = getMostVotes(response.data).map((id) => {
                return `https://imdb-api.com/en/API/Ratings/${apikey}/${id}`;
            });
            getHighestRated(ratingsUrlArray);
        } catch (error) {
            console.error(error);
        }
    }

    // Fetch data and get highest rated
    async function getHighestRated(urls) {
        const requests = [];
        for (let i = 0; i < urls.length; i++) {
            requests.push(axios.get(urls[i]));
        }

        try {
            const response = await axios.all(requests);
            const ratingsArray = response.map((i) => i.data);

            const recommendUrls = getRatings(ratingsArray).map((i) => {
                return `https://imdb-api.com/en/API/Title/${apikey}/${i[0]}/FullActor,FullCast,Posters,Images,Trailer,Ratings`;
            });

            getFinalData(recommendUrls);
        } catch (error) {
            console.log(error);
        }
    }

    // Fetch data and get highest rated
    async function getFinalData(urls) {
        const requests = [];
        for (let i = 0; i < urls.length; i++) {
            requests.push(axios.get(urls[i]));
        }

        try {
            const response = await axios.all(requests);
            const finalData = response.map((i) => i.data);

            const recommendations = finalData.map((i) => {
                return {
                    title: i.title,
                    year: i.year,
                    type: i.type,
                    image: i.image,
                    plot: i.plot,
                    trailer: i.trailer.linkEmbed,
                };
            });

            setData(recommendations);
        } catch (error) {
            console.log(error);
        }
    }

    // Get twenty most rated films / tv shows and return an array of ids
    function getMostVotes(data) {
        const results = data.results
            .filter((i) => i.imDbRatingVotes !== null) // Filters null values
            .sort(
                (a, b) =>
                    parseInt(b.imDbRatingVotes) - parseInt(a.imDbRatingVotes)
            ) // Sort array by highest votes
            .slice(0, 20) // Get highest 20
            .sort((a, b) => parseFloat(b.imDbRating) - parseFloat(a.imDbRating)) // Sort array by highest rating
            .map((i) => i.id) // Get ids
            .slice(0, 10); // Get ten highest rated

        return results;
    }

    // Function to sort films / tv shows by ratings and return an array
    function getRatings(data) {
        const highlyRated = data
            .map((i) => {
                return [
                    [
                        i.imDbId,
                        parseFloat(i.imDb) * 10,
                        parseInt(i.metacritic),
                        parseInt(i.rottenTomatoes),
                        parseFloat(i.theMovieDb) * 10,
                        parseFloat(i.filmAffinity) * 10,
                    ],
                ];
            }) // Gets movie/tv show id and all ratings
            .filter((i) => !i[0].includes(NaN)) // Filters out arrays with NaNs
            .map((i) => [
                i[0][0],
                i[0]
                    .slice(1)
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + currentValue
                    ) / i[0].slice(1).length,
            ]) // Gets an average of all the ratings
            .sort((a, b) => b[1] - a[1]) // Sorts array
            .slice(0, 5); // Gets the five highest rated
        return highlyRated;
    }

    return <>{console.log(data)}</>;
}

export default Recommendation;
