// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MostPopularMovies from './components/MostPopularMovies/MostPopularMovies';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Details from './components/Details/Details';
import WatchMode from './components/WatchMode/WatchMode';
import Recommendations from './components/Recommendations/Recommendations';
//import Watchinfo from './components/WatchInfo/Watchinfo';
import { useState } from 'react';

function App() {
    const [showPop, setShowPop] = useState(false);
    const [showHero, setShowHero] = useState(true);
    const [showDetails, setShowDetails] = useState(false);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [showWatchMode, setShowWatchMode] = useState(false);
    //const [showWatchInfo, setShowWatchInfo] = useState(false);
    const [mostPopId, setMostPopId] = useState('');
    const [recommendId, setRecommendId] = useState('');
    const [searchId, setSearchId] = useState('');
    //const [watchModeId, setWatchModeId] = useState('');

    return (
        <>
            <Header
                setShowPop={setShowPop}
                setShowHero={setShowHero}
                setSearchId={setSearchId}
                searchId={searchId}
                setShowRecommendations={setShowRecommendations}
                setShowDetails={setShowDetails}
            />
            {showHero ? (
                <Hero setShowHero={setShowHero} setShowPop={setShowPop} />
            ) : (
                <></>
            )}
            {showPop ? (
                <MostPopularMovies
                    setShowDetails={setShowDetails}
                    setMostPopId={setMostPopId}
                    setShowPop={setShowPop}
                    setShowRecommendations={setShowRecommendations}
                />
            ) : (
                <></>
            )}
            {showDetails ? (
                <Details
                    mostPopId={mostPopId}
                    setShowRecommendations={setShowRecommendations}
                    setShowHero={setShowHero}
                    setRecommendId={setRecommendId}
                    setSearchId={setSearchId}
                    searchId={searchId}
                    showWatchMode={showWatchMode}
                    setShowWatchMode={setShowWatchMode}
                />
            ) : (
                <></>
            )}
            {showWatchMode ? (
                <WatchMode searchId={searchId} mostPopId={mostPopId} />
            ) : (
                <></>
            )}
            {/* {showWatchInfo ? <Watchinfo /> : <></>} */}
            {showRecommendations ? (
                <Recommendations
                    id={recommendId}
                    setSearchId={setSearchId}
                    mostPopId={mostPopId}
                    searchId={searchId}
                    setShowWatchMode={setShowWatchMode}
                />
            ) : (
                <></>
            )}
            <Footer />
        </>
    );
}

export default App;
