import axios from 'axios';
import { useEffect, useState } from 'react';
import apikey from './apikey';
import { MDBSpinner, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';

const Recommendations = (props) => {
    const [data, setData] = useState('');
    const [genres, setGenres] = useState('');
    const showId = props.id;
    const groups = [
        'oscar_best_picture_nominees',
        'oscar_nominees',
        'top_100',
        'oscar_winners',
        'emmy_winners',
        'golden_globe_winners',
        'emmy_nominees',
        'golden_globe_nomine',
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `https://imdb-api.com/en/API/Title/${apikey}/${showId}`
                );
                setGenres(response.data.genres);
            } catch (error) {
                console.log(error);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const groupSelect = shuffle(groups)[0];

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `https://imdb-api.com/API/AdvancedSearch/${apikey}?genres=${genres}&count=100&sort=num_votes,desc&groups=${groupSelect}`
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (data.length === 0) {
        return (
            <section className='py-5 px-2 bg-light bg-gradient'>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <div className='d-flex justify-content-center'>
                                <MDBSpinner role='status'>
                                    <span className='visually-hidden'>
                                        Loading...
                                    </span>
                                </MDBSpinner>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        );
    } else {
        return (
            <section className='py-5 px-2 bg-light bg-gradient'>
                <h2 className='text-center'>Recommendations</h2>
                <MDBContainer>
                    <MDBRow>
                        {data.map((i) => {
                            return (
                                <MDBCol
                                    sm='5'
                                    md='4'
                                    xl='2'
                                    className='g-3'
                                    key={i.data.id}
                                >
                                    <p>{i.data.title}</p>
                                    <img
                                        src={i.data.image}
                                        alt={i.data.title}
                                        width='200px'
                                        className='rounded-7 responsive'
                                    />
                                    <p>Rating: {i.data.imDbRating}</p>
                                </MDBCol>
                            );
                        })}
                    </MDBRow>
                </MDBContainer>
            </section>
        );
    }
};

export default Recommendations;
