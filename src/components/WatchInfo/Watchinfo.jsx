import axios from 'axios';

// Store the API key in a constant variable
const API_KEY = '146efc923dmshd7fd146022b4b75p1a3965jsn3005c3ee89b6';

// Define an async function that gets the watch link and price for a given IMDB ID
const getWatchInfo = async (imdbId) => {
  try {
    const response = await axios.get(`https://streaming-availability.p.rapidapi.com/v2/get/basic`, {
      params: { country: 'us', imdb_id: imdbId, fields: 'streamingInfo' },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
      },
    });

    // Extract the streaming information from the response using the provided path
    const streamingInfo = response.data.result.streamingInfo.us.apple;

    // Extract the watch links, quality, and price information from the streaming information
    const watchLinks = streamingInfo.map(info => info.link);
    const quality = streamingInfo.map(info => info.quality);
    const price = streamingInfo[0].price;

    // Create an object with the watch links, quality, and price information
    const result = { watchLinks, quality, price };
    return result;
  } catch (error) {
    console.error(error);
  }
};

getWatchInfo('tt1375666')
  .then(result => console.log(result))
  .catch(error => console.error(error));


export default getWatchInfo;