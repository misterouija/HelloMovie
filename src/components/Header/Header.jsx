import { useState } from 'react';
import { MDBNavbar, MDBContainer } from 'mdb-react-ui-kit';
import Search from '../Search/Search';

export default function Header() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [searchTerm, setSearchTerm] = useState('men');

    const re = /^[a-z0-9 ]+$/i;

    function handleSearch(e) {
        e.preventDefault();
        const searchVal =
            e.target.parentElement.parentElement.firstChild.value.trim();
        if (searchVal.length === 0 || re.test(searchVal) === false) {
            setSearchTerm('No searh entered');
        } else setSearchTerm(searchVal);
        e.target.parentElement.parentElement.firstChild.value = '';
        setShow(true);
    }

    return (
        <header>
            <MDBNavbar
                expand='lg'
                className='bg-gradient'
                style={{
                    backgroundColor: 'var(--mdb-gray-400)',
                    backgroundImage: 'var(--bs-gradient)',
                }}
            >
                <MDBContainer fluid>
                    <div className='d-flex flex-grow-1'>
                        <a className='navbar-brand mt-2 mt-lg-0' href='/'>
                            <img
                                src='https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp'
                                height='15'
                                alt='MDB Logo'
                            />
                        </a>
                    </div>
                    <form className='searchForm flex-grow-1'>
                        <input
                            type='text'
                            className='form-control form-input'
                            placeholder='Search your favorite movie'
                            name='search'
                            role='search'
                        />
                        <span className='left-pan'>
                            <i
                                type='button'
                                className='fa fa-search'
                                onClick={handleSearch}
                            ></i>
                        </span>
                    </form>
                    <div className='flex-grow-1'>
                        <div style={{ width: '40px', height: '15px' }}></div>
                    </div>
                </MDBContainer>
            </MDBNavbar>

            <div
                className='p-1 text-center bg-image'
                style={{
                    backgroundImage:
                        "url('https://mdbootstrap.com/img/new/slides/041.webp')",
                    height: 400,
                }}
            >
                <div
                    className='mask'
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                >
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='text-white'>
                            <h1 className='mb-3'>Welcome to HelloMovie</h1>
                            <h4 className='mb-3'>
                                A movie recommendation engine
                            </h4>
                            <a
                                className='btn btn-secondary btn-lg rounded-pill'
                                href='#!'
                                role='button'
                            >
                                Call to action
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Search
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
                searchTerm={searchTerm}
            />
        </header>
    );
}
