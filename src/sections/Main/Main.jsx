//import { MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import MostPopularMovies from '../../components/MostPopularMovies/MostPopularMovies';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Main(props) {
    return (
        <>
            <Header />
            <MostPopularMovies />
            <Footer />
        </>
    );
}
