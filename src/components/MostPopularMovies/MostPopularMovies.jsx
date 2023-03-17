import axios from 'axios';
import { useState, useEffect } from 'react';
import apikey from '../Recommendations/apikey';

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCol,
    MDBCardLink,
} from 'mdb-react-ui-kit';

export default function MostPopularMovies(props) {
    const [data, setData] = useState('');
    useEffect(() => {
        getMovieRequest('get out');
    }, []);

    const getMovieRequest = async () => {
        const url = `https://imdb-api.com/en/API/MostPopularMovies/${apikey}`;
        try {
            const response = await axios.get(url);
            setData(response.data.items);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h2 className='componentTitle text-center'>Most Popular Movies</h2>
            {Array.from(data)
                .slice(0, 6)
                .map((i) => {
                    return (
                        <MDBCol sm='5' md='4' xl='2' className='g-3' key={i.id}>
                            <MDBCard className='h-100'>
                                <MDBCardImage
                                    src={i.image}
                                    position='top'
                                    alt={i.title}
                                    height='150px'
                                    style={{ objectFit: 'cover' }}
                                />
                                <MDBCardBody className='cardBody'>
                                    <MDBCardTitle
                                        style={{ fontSize: '0.85em' }}
                                        className='cardTitle'
                                    >
                                        {i.title}
                                    </MDBCardTitle>
                                    <MDBCardText className='cardText'>
                                        {i.year}
                                    </MDBCardText>
                                    <MDBCardText
                                        className='fw-lighter cardText'
                                        style={{ fontSize: '0.75em' }}
                                    >
                                        {i.crew}
                                    </MDBCardText>
                                    <MDBCardLink
                                        href={i.image}
                                        className='fw-lighter'
                                        style={{ fontSize: '0.75em' }}
                                    >
                                        More
                                    </MDBCardLink>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    );
                })}
        </>
    );
}
