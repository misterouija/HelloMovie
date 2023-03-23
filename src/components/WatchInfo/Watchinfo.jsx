import axios from 'axios';
import { useState, useEffect } from 'react';

// Store the API key in a constant variable
const API_KEY = '146efc923dmshd7fd146022b4b75p1a3965jsn3005c3ee89b6';

const Watchinfo = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        getWatchInfo('tt1877830');
    }, []);

    // Define an async function that gets the watch link and price for a given IMDB IDs
    const getWatchInfo = async (imdbId) => {
        try {
            const response = await axios.get(
                `https://streaming-availability.p.rapidapi.com/v2/get/basic`,
                {
                    params: {
                        country: 'us',
                        imdb_id: imdbId,
                        fields: 'streamingInfo',
                    },
                    headers: {
                        'x-rapidapi-key': API_KEY,
                        'x-rapidapi-host':
                            'streaming-availability.p.rapidapi.com',
                    },
                }
            );
            setData(response.data.result.streamingInfo.us);
        } catch (error) {
            console.error(error);
        }
    };

    const availability = {};

    for (const val in data) {
        // console.log(`${val}: ${data[val]}`);

        let arr = [];
        for (const v in data[val]) {
            //console.log(data[val][v].link);
            arr.push(
                data[val][v].link,
                data[val][v].price,
                data[val][v].quality
            );
        }
        availability[val] = arr;
    }

    console.log(availability);

    // console.log(data);
    // // Extract the streaming information from the response using the provided path
    // const streamingInfo = data.result.streamingInfo.us.apple;

    return (
        <>
            <p>react snippet works!</p>
        </>
    );
};

export default Watchinfo;

// // Extract the watch links, quality, and price information from the streaming information
// const watchLinks = streamingInfo.map((info) => info.link);
// const quality = streamingInfo.map((info) => info.quality);
// const price = streamingInfo[0].price;

// // Create an object with the watch links, quality, and price information
// const result = { watchLinks, quality, price };
// return result;
