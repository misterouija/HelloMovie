import axios from 'axios';

async function getMovie() {
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        );
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

getMovie();

function recommendations() {
    const data = { name: 'Get out' };
    return data;
}

export default recommendations;
