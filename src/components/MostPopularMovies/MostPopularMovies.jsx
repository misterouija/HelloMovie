import axios from 'axios';
import { useState, useEffect } from 'react';
import apikey from '../Recommendations/apikey';
import Details from '../Details/Details';

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCol,
} from 'mdb-react-ui-kit';

export default function MostPopularMovies(props) {
    const [data, setData] = useState('');
    const [component, setComponent] = useState('MostPopularMovies');
    const [id, setId] = useState('');

    useEffect(() => {
        getMostPopular();
    }, []);

    const getMostPopular = async () => {
        const url = `https://imdb-api.com/en/API/MostPopularMovies/${apikey}`;
        try {
            const response = await axios.get(url);
            setData(response.data.items);
        } catch (error) {
            console.log(error);
        }
    };

    function handleClick(e) {
        setComponent('Details');
        setId(e.target.attributes.name.value);
    }

    if (component === 'MostPopularMovies') {
        return (
            <>
                <h2 className='componentTitle text-center'>
                    Most Popular Movies
                </h2>
                {Array.from(data)
                    .slice(0, 6)
                    .map((i) => {
                        return (
                            <MDBCol
                                sm='5'
                                md='4'
                                xl='2'
                                className='g-3'
                                key={i.id}
                            >
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
                                        <span
                                            name={i.id}
                                            className='fw-lighter moreLink'
                                            style={{ fontSize: '0.75em' }}
                                            onClick={handleClick}
                                        >
                                            More
                                        </span>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        );
                    })}
            </>
        );
    } else {
        return <Details id={id} />;
    }
}
