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
    MDBContainer,
    MDBRow,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
} from 'mdb-react-ui-kit';

export default function MostPopularMovies(props) {
    const [data, setData] = useState('');
    const [clicked, setClicked] = useState(false);
    const [id, setId] = useState('');
    const [tabActive, setTabActive] = useState('tab1');
    const [endPoint, setEndPoint] = useState('MostPopularMovies');
    const [title, setTitle] = useState('Most Popular Movies');

    useEffect(() => {
        getMostPopular();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endPoint]);

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const getMostPopular = async () => {
        const url = `https://imdb-api.com/en/API/${endPoint}/${apikey}`;
        try {
            const response = await axios.get(url);
            setData(shuffle(response.data.items));
        } catch (error) {
            console.log(error);
        }
    };

    function handleClick(e) {
        setClicked(true);
        setId(e.target.attributes.name.value);
    }

    function handleTabClick(value) {
        if (value === tabActive) {
            return;
        }

        if (value === 'tab3') {
            setEndPoint('MostPopularTVs');
            setTitle('Most Popular TV Shows');
        } else if (value === 'tab4') {
            setEndPoint('Top250TVs');
            setTitle('Top TV Show');
        } else if (value === 'tab1') {
            setEndPoint('MostPopularMovies');
            setTitle('Most Popular Movies');
        } else {
            setEndPoint('Top250Movies');
            setTitle('Top Movies');
        }

        setTabActive(value);
    }

    const tabs = (
        <>
            <MDBTabs fill className='mb-1 myTab'>
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => handleTabClick('tab1')}
                        active={tabActive === 'tab1'}
                    >
                        <p>Most Popular Movies</p>
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => handleTabClick('tab2')}
                        active={tabActive === 'tab2'}
                    >
                        <p>Top Movies</p>
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => handleTabClick('tab3')}
                        active={tabActive === 'tab3'}
                    >
                        <p>Most Popular TV Shows</p>
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => handleTabClick('tab4')}
                        active={tabActive === 'tab4'}
                    >
                        <p>Top TV Shows</p>
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>
        </>
    );

    const mostPop = (
        <section className='py-5 px-2 bg-black bg-gradient'>
            <MDBContainer>
                <MDBRow>
                    <h2 className='componentTitle text-center mb-3'>{title}</h2>
                    {tabs}

                    {Array.from(data)
                        .slice(0, 6)
                        .map((i) => {
                            return (
                                <MDBCol
                                    md='4'
                                    xl='2'
                                    className='g-3 col-6'
                                    key={i.id}
                                >
                                    <MDBCard className='h-100 border-7'>
                                        <MDBCardImage
                                            src={i.image}
                                            position='top'
                                            alt={i.title}
                                            height='150px'
                                            style={{
                                                objectFit: 'cover',
                                                objectPosition: 'top',
                                            }}
                                        />
                                        <MDBCardBody className='cardBody'>
                                            <MDBCardTitle
                                                style={{
                                                    fontSize: '0.85em',
                                                }}
                                                className='cardTitle'
                                            >
                                                {i.title}
                                            </MDBCardTitle>
                                            <MDBCardText className='cardText'>
                                                {i.year}
                                            </MDBCardText>
                                            <MDBCardText
                                                className='fw-lighter cardText'
                                                style={{
                                                    fontSize: '0.75em',
                                                }}
                                            >
                                                {i.crew}
                                            </MDBCardText>
                                            <span
                                                name={i.id}
                                                className='fw-lighter moreLink'
                                                style={{
                                                    fontSize: '0.75em',
                                                }}
                                                onClick={handleClick}
                                            >
                                                More
                                            </span>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                            );
                        })}
                </MDBRow>
            </MDBContainer>
        </section>
    );

    const details = <Details id={id} />;

    const render = clicked ? details : mostPop;

    return <>{render}</>;
}
