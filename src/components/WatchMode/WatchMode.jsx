import { watchModeApiKey } from './apikey';

import { useState, useEffect } from 'react';
import axios from 'axios';

const title = 'tt1877830';
const URL = `https://api.watchmode.com/v1/title/${title}/sources/?apiKey=${watchModeApiKey}`;

const WatchMode = () => {
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
    }, []);

    console.log(data);

    return (
        <section>
            <div className='container'>
                <div className='row row-cols-12 g-1'>
                    {data.map((i) => {
                        return (
                            <div className='col'>
                                <a href={i.web_url}>
                                    <div className='card p-1 h-100 bg-primary bg-gradient'>
                                        <span>{i.name}</span>
                                        <span>{i.format}</span>
                                        <span>${i.price}</span>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WatchMode;
