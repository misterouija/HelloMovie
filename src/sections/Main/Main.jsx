//import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import MostPopularMovies from '../../components/MostPopularMovies/MostPopularMovies';
// import Recommendations from '../../components/Recommendations/Recommendations';

export default function Main(props) {
    return (
        <>
            <MostPopularMovies />

            {/* <section className='py-5 px-2 bg-light bg-gradient'>
                <MDBContainer>
                    <MDBRow className='d-flex justify-content-center'>
                        <Recommendations genre='action,adventure' />
                    </MDBRow>
                </MDBContainer>
            </section> */}
        </>
    );
}
