import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import MostPopularMovies from '../../components/MostPopularMovies/MostPopularMovies';

export default function Main() {
    return (
        <>
            <section className='py-5 px-2 bg-black bg-gradient'>
                <MDBContainer>
                    <MDBRow>
                        <MostPopularMovies />
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
}
