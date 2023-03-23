import { watchModeApiKey } from './apikey';

import { useState, useEffect } from 'react';
import axios from 'axios';

const WatchMode = (props) => {
    const title = props.searchId || props.mostPopId;
    const URL = `https://api.watchmode.com/v1/title/${title}/sources/?apiKey=${watchModeApiKey}`;
    const [data, setData] = useState('');

    useEffect(() => {
        (async function () {
            try {
                const response = await axios.get(URL);
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (data.length === 0) {
        return <>Loading...</>;
    }

    return (
        // <></>
        <section className='py-5' id='watchmode'>
            <div className='container'>
                <div className='row row-cols-1 row-cols-md-3 row-cols-lg-4 g-2 '>
                    {data.map((i, idx) => {
                        return (
                            <div className='col' key={idx}>
                                <div className='card p-2 bg-dark bg-gradient h-100 flex-row justify-content-between'>
                                    <span className='badge bg-black'>
                                        {i.format}
                                    </span>
                                    <a
                                        href={i.web_url}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <span
                                            style={{
                                                fontSize: '0.85em',
                                                color: '#ff1d46',
                                            }}
                                        >
                                            {i.name}
                                        </span>
                                    </a>

                                    <span className='text-light'>
                                        ${i.price}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WatchMode;
