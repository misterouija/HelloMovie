import { MDBCol } from 'mdb-react-ui-kit';
import axios from 'axios';
import apikey from '../Recommendations/apikey';
import { useEffect, useState } from 'react';

export default function Details(props) {
    const [data, setData] = useState('');

    useEffect(() => {
        getDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getDetails() {
        try {
            const response = await axios.get(
                `https://imdb-api.com/en/API/Title/${apikey}/${props.id}/FullActor,FullCast,Posters,Images,Trailer,Ratings`
            );
            console.log(response.data);
            const details = {
                title: response.data.title,
                year: response.data.year,
                type: response.data.type,
                image: response.data.image,
                plot: response.data.plot,
                trailer: response.data.trailer.linkEmbed,
            };

            setData(details);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <MDBCol md='3' className='g-3'>
                <img
                    src={data.image}
                    alt={data.title}
                    className='img-fluid rounded-5'
                />
            </MDBCol>
            <MDBCol md='6' className='g-3'>
                <div className=''>
                    <iframe
                        src={data.trailer}
                        title={data.title}
                        allowFullScreen
                    ></iframe>
                </div>
            </MDBCol>
            <MDBCol md='3' className='g-3'>
                <h4>{data.title}</h4>
                <p>Plot: {data.plot}</p>
            </MDBCol>
        </>
    );
}
