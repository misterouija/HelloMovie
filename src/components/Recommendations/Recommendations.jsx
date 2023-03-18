import axios from 'axios';
import { useEffect, useState } from 'react';
import apikey from './apikey';
import { MDBSpinner } from 'mdb-react-ui-kit';

const Recommendations = (props) => {
    // const [genreData, setGenreData] = useState('');
    // // const [ratings, setRatings] = useState('');
    // const [fetching, setFetching] = useState(true);
    const [data, setData] = useState('');
    const genre = 'horror,mystery,thriller';

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `https://imdb-api.com/API/AdvancedSearch/${apikey}?genres=${genre}&count=100&sort=num_votes,desc`
                );
                const ratingsRequest = response.data.results
                    .slice(0, 3)
                    .map((i) =>
                        axios.get(
                            `https://imdb-api.com/en/API/Ratings/${apikey}/${i.id}`
                        )
                    );

                (async () => {
                    try {
                        const response = await axios.all(ratingsRequest);

                        const recommendIds = response
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
                                        (accumulator, currentValue) =>
                                            accumulator + currentValue
                                    ) / i.slice(1).length,
                            ]) // Gets an average of all the ratings
                            .sort((a, b) => b[1] - a[1])
                            .map((i) => i[0]); // Sorts array

                        const recommendRequest = recommendIds.map((i) => {
                            return axios.get(
                                `https://imdb-api.com/en/API/Title/${apikey}/${i}/FullActor,FullCast,Posters,Images,Trailer,Ratings`
                            );
                        });

                        (async () => {
                            try {
                                const response = await axios.all(
                                    recommendRequest
                                );

                                setData(response);
                            } catch (error) {
                                console.log(error);
                            }
                        })();
                    } catch (error) {
                        console.log(error);
                    }
                })();
            } catch (error) {
                console.error(error);
            }
        })();

        return () => {};
    }, []);

    if (data.length === 0) {
        return (
            <div className='d-flex justify-content-center'>
                <MDBSpinner role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </MDBSpinner>
            </div>
        );
    } else {
        return (
            <>
                <h2>hello world</h2>
                {data.map((i) => {
                    return <p key={i.data.id}>{i.data.title}</p>;
                })}
            </>
        );
    }
};

export default Recommendations;
