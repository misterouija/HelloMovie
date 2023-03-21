import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBContainer,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Details from '../Details/Details';

const Search = (props) => {
    const [data, setData] = useState('');
    const [id, setId] = useState('');
    // const [choice, setChoice] = (false);

    function handleClick(e) {
        console.log(e.target.attributes.name.value);
        setId(e.target.attributes.name.value);
        props.handleClose();
    }

    useEffect(() => {
        props.searchTerm === 'No searh entered'
            ? setData(false)
            : (async function () {
                  try {
                      const response = await axios.get(
                          `https://www.omdbapi.com/?s=${props.searchTerm}&apikey=263d22d8`
                      );
                      setData(response.data.Search);
                  } catch (error) {
                      console.log(error);
                  }
              })();
    }, [props.searchTerm]);

    if (id.length !== 0) {
        return <Details id={id} />;
    }

    return (
        <>
            <MDBModal
                show={props.show}
                onHide={props.handleClose}
                staticBackdrop
            >
                <MDBModalDialog size='xl'>
                    <MDBModalContent>
                        <MDBModalHeader
                            style={{
                                backgroundColor: 'var(--mdb-gray-400)',
                                backgroundImage: 'var(--bs-gradient)',
                            }}
                        >
                            <MDBModalTitle>Search Results</MDBModalTitle>
                            <button
                                type='button'
                                className='btn-close'
                                onClick={props.handleClose}
                            ></button>
                        </MDBModalHeader>
                        <MDBModalBody className='bg-black bg-gradient'>
                            <MDBContainer>
                                {!data ? (
                                    <div>
                                        <h2 className='text-center'>
                                            No results found
                                        </h2>
                                    </div>
                                ) : (
                                    Array.from(data).map((i) => {
                                        return (
                                            <MDBRow
                                                key={i.imdbID}
                                                className='mb-3 p-2 rounded-5'
                                                style={{
                                                    backgroundColor:
                                                        'rgba(255,255,255,0.1)',
                                                }}
                                            >
                                                <MDBCol>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='flex1'>
                                                            <img
                                                                src={i.Poster}
                                                                alt={i.Title}
                                                                width='100px'
                                                                className='rounded-5'
                                                            />
                                                        </div>
                                                        <div className='flex-grow-1 mx-3'>
                                                            <h5
                                                                style={{
                                                                    color: '#ff1d46',
                                                                }}
                                                            >
                                                                {i.Title}
                                                            </h5>
                                                            <p className='text-light'>
                                                                {i.Year}
                                                            </p>
                                                            <button
                                                                type='button'
                                                                name={i.imdbID}
                                                                className='btn btn-sm bg-light'
                                                                onClick={
                                                                    handleClick
                                                                }
                                                            >
                                                                Select
                                                            </button>
                                                        </div>
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>
                                        );
                                    })
                                )}
                            </MDBContainer>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default Search;
