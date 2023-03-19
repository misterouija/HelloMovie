import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './sections/Main/Main';
// import { Route, Routes } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
    return (
        <>
            <Header />
            <Main />

            <Footer />
        </>
    );
}

export default App;
