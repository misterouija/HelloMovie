import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieChoice = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    `https://imdb-api.com/en/API/Search/k_tngmwe8s/get out`
                );
                setData(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            {data.data.results.map((i) => {
                return (
                    <>
                        <p>{i.title}</p>
                        <img src={i.image} alt={i.title} />
                    </>
                );
            })}
        </>
    );
};

export default MovieChoice;
