import axios from 'axios';
import { useEffect, useState } from 'react';
import apikey from '../../apikeys';
import { MDBSpinner, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Recommendations = (props) => {
    const [data, setData] = useState('');
    const [genres, setGenres] = useState('');
    const [showId, setShowId] = useState('');

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

    function handleClick(e) {
        props.setSearchId(e.target.attributes.name.value);
        setShowId(e.target.attributes.name.value);
        document.querySelector('#details').scrollIntoView();
        props.setShowWatchMode(false);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, [showId]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `https://imdb-api.com/en/API/Title/${apikey}/${
                        props.mostPopId || props.searchId
                    }`
                );
                setGenres(
                    shuffle(response.data.genres.split(', ')).slice(0, 2)
                );
            } catch (error) {
                console.log(error);
            }
        })();
    }, [props.searchId, props.mostPopId]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `https://imdb-api.com/API/AdvancedSearch/${apikey}?genres=${genres}&count=100&sort=num_votes,desc&groups=${
                        shuffle(groups)[2]
                    }`
                );
                const ratingsRequest = response.data.results
                    .slice(0, 6)
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
    }, [showId]);

    if (data.length === 0) {
        return (
            <section className='py-5 px-2 bg-light bg-gradient'>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol>
                            <div className='d-flex justify-content-center'>
                                <h3>Loading...</h3>
                                <MDBSpinner role='status'>
                                    <span className='visually-hidden mt-3'>
                                        Loading...
                                    </span>
                                </MDBSpinner>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        );
    }

    return (
        <section
            className='py-5 px-2 bg-light bg-gradient'
            id='recommendations'
        >
            <h2 className='text-center'>Your Recommendations</h2>
            <MDBContainer data-aos='fade-up'>
                <MDBRow>
                    {data.map((i) => {
                        return (
                            <MDBCol
                                md='4'
                                xl='2'
                                className='g-3 col-6'
                                key={i.data.id}
                            >
                                <div
                                    className='bg-image hover-zoom rounded-5 h-100 recommendCard'
                                    style={{ maxWidth: '22rem' }}
                                    onClick={handleClick}
                                >
                                    <img
                                        src={i.data.image}
                                        className='w-100'
                                        alt={i.data.title}
                                        name={i.data.id}
                                    />
                                    <div
                                        className='position-absolute bottom-0 text-light w-100'
                                        style={{
                                            backgroundColor: 'rgba(0, 0, 0, 1)',
                                        }}
                                    >
                                        <p
                                            className='p-2 m-0 fw-lighter'
                                            style={{
                                                color: '#ff1d46',
                                                fontSize: '0.85em',
                                            }}
                                        >
                                            {i.data.title}
                                        </p>
                                    </div>
                                </div>
                            </MDBCol>
                        );
                    })}
                </MDBRow>
            </MDBContainer>
        </section>
    );
};

export default Recommendations;
