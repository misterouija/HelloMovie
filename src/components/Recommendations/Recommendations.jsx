import axios from 'axios';
import { useEffect, useState } from 'react';
import apikey from './apikey';

const Recommendations = (props) => {
    const [genreData, setGenreData] = useState('');
    const [ratings, setRatings] = useState('');
    const [recommend, setRecommend] = useState('');
    const genre = 'horror,mystery,thriller';

    useEffect(() => {
        findMoviesByGenre();
    }, []);

    useEffect(() => {
        getRatings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getRecommended();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function findMoviesByGenre() {
        try {
            const response = await axios.get(
                `https://imdb-api.com/API/AdvancedSearch/${apikey}?genres=${genre}&count=100&sort=num_votes,desc`
            );
            setGenreData(response.data.results);
        } catch (error) {
            console.error(error);
        }
    }

    async function getRatings() {
        const urls = ratingUrlIds
            .slice(0, 2)
            .map((show) =>
                axios.get(
                    `https://imdb-api.com/en/API/Ratings/${apikey}/${show.id}`
                )
            );
        try {
            const response = await axios.all(urls);
            setRatings(response);
        } catch (error) {
            console.error(error);
        }
    }

    async function getRecommended() {
        const urls = Array.from(recommendUrlIds).map((id) =>
            axios.get(
                `https://imdb-api.com/en/API/Title/${apikey}/${id}/FullActor,FullCast,Posters,Images,Trailer,Ratings`
            )
        );

        try {
            const response = await axios.all(urls);
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
            setRecommend(recommendations);
        } catch (error) {
            console.log(error);
        }
    }

    const ratingUrlIds = Array.from(genreData);
    const recommendUrlIds = Array.from(ratings)
        .map((i) => [
            i.data.imDbId,
            parseFloat(i.data.imDb) * 10,
            parseInt(i.data.metacritic),
            parseInt(i.data.rottenTomatoes),
            parseFloat(i.data.theMovieDb) * 10,
            parseFloat(i.data.filmAffinity) * 10,
        ])
        .filter((i) => !i.includes(NaN)) // Filters out arrays with NaNs
        .map((i) => [
            i[0],
            i
                .slice(1)
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                ) / i.slice(1).length,
        ]) // Gets an average of all the ratings
        .sort((a, b) => b[1] - a[1])
        .map((i) => i[0]); // Sorts array
    // .slice(0, 5); // Gets the five highest rated

    console.log(recommend);

    return (
        <>
            <h2>hello world</h2>
        </>
    );
};

export default Recommendations;
