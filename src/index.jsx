// src/index.jsx
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WatchlistProvider } from './context/WatchlistContext';
import { ContinueWatchingProvider } from './context/ContinueWatchingContext';
import { ToastProvider } from './context/ToastContext';
import NavBar from './components/Others/NavBar';
import Footer from './components/Others/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import reportWebVitals from './reportWebVitals';
import './styles/root.css';

const Movies = lazy(() => import('./components/Movies'));
const TvShows = lazy(() => import('./components/TvShows'));
const Banner = lazy(() => import('./components/Banner'));
const MovieDetail = lazy(() => import('./components/MovieDetail'));
const TvShowDetails = lazy(() => import('./components/TvShowDetails'));
const Player = lazy(() => import('./components/Player'));
const SearchPage = lazy(() => import('./components/SearchPage'));
const DMCA = lazy(() => import('./components/Others/NavSideFiles/DMCA'));
const About = lazy(() => import('./components/Others/NavSideFiles/About'));
const Categories = lazy(() => import('./components/Categories'));
const TopActorsActresses = lazy(() => import('./components/TopActorsActresses'));
const TopCompanies = lazy(() => import('./components/TopCompanies'));
const NowPlaying = lazy(() => import('./components/NowPlaying'));
const Anime = lazy(() => import('./components/Anime'));
const AnimeTv = lazy(() => import('./components/AnimeTv'));
const Turkish = lazy(() => import('./components/Turkish'));
const TurkishTv = lazy(() => import('./components/TurkishTv'));
const Iranian = lazy(() => import('./components/Iranian'));
const IranianTv = lazy(() => import('./components/IranianTv'));
const MovieTrailers = lazy(() => import('./components/MovieTrailers'));
const SideBtn = lazy(() => import('./components/Others/SideButtons'));
const ContinueWatching = lazy(() => import('./components/ContinueWatching'));
const MyList = lazy(() => import('./components/MyList'));
const Shorts = lazy(() => import('./components/Shorts'));
const NotFound = lazy(() => import('./components/NotFound'));

const HomePage = () => (
  <>
    <NavBar />
    <Banner />
    <SideBtn />
    <ContinueWatching />
    <Movies />
    <TvShows />
    <Categories />
    <Anime />
    <AnimeTv />
    <Iranian />
    <IranianTv />
    <Turkish />
    <TurkishTv />
    <NowPlaying />
    <MovieTrailers />
    <TopActorsActresses />
    <TopCompanies />
    <Footer />
  </>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WatchlistProvider>
      <ContinueWatchingProvider>
        <ToastProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner fullScreen label="Loading" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shorts" element={<Shorts />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/tv/:id" element={<TvShowDetails />} />
                <Route path="/player/:id" element={<Player />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/my-list" element={<MyList />} />
                <Route path="/dmca" element={<DMCA />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </ToastProvider>
      </ContinueWatchingProvider>
    </WatchlistProvider>
  </React.StrictMode>,
);

reportWebVitals();
