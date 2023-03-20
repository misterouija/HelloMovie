import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Search = (props) => {
    const [data, setData] = useState('');

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

    return (
        <>
            <MDBModal show={props.show} onHide={props.handleClose}>
                <MDBModalDialog size='xl'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Search Results</MDBModalTitle>
                            <button
                                type='button'
                                className='btn-close'
                                onClick={props.handleClose}
                            ></button>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {!data ? (
                                <div>
                                    <h2 className='text-center'>
                                        No results found
                                    </h2>
                                </div>
                            ) : (
                                Array.from(data).map((i) => (
                                    <div key={i.imdbID}>
                                        <h6>{i.Title}</h6>
                                        <p>{i.Year}</p>

                                        <img
                                            src={i.Poster}
                                            alt={i.Title}
                                            width='150px'
                                            className='mb-5'
                                        />
                                    </div>
                                ))
                            )}
                        </MDBModalBody>
                        {/* <MDBModalFooter>
                            <button
                                type='button'
                                className='btn btn-primary'
                                onClick={props.handleClose}
                            >
                                Close
                            </button>
                            <button
                                type='button'
                                className='btn btn-primary'
                                onClick={props.handleClose}
                            >
                                Save changes
                            </button>
                        </MDBModalFooter> */}
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default Search;
