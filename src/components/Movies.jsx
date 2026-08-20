import React from 'react';
import {
  getTrendingMovies,
  getPopularMovies,
  getUpcomingMovies,
} from '../services/tmdbService';
import FilterableMediaSection from './FilterableMediaSection';

const FILTERS = [
  { key: 'trending', id: 'trending', label: 'Trending', fetchFn: getTrendingMovies },
  { key: 'popular', id: 'popular', label: 'Popular', fetchFn: getPopularMovies },
  { key: 'upcoming', id: 'upcoming', label: 'Upcoming', fetchFn: getUpcomingMovies },
];

const notice = (
  <div className="section-notice">
    <i className="fas fa-triangle-exclamation"></i> We do not host, store, or transmit any movies, TV shows, or other media files on our own infrastructure. The service helps you discover and access content through third‑party sources. We do not control those sources or their content.
    Please disable your ad blocker. We don&apos;t show ads while you watch. <br /> <b style={{ color: '#ac77ff' }}>An account is NOT required to access and use Moviedon.</b>
  </div>
);

const Movies = () => (
  <FilterableMediaSection
    sectionId="movies"
    title="Movies"
    icon="fa-solid fa-film"
    filters={FILTERS}
    linkPrefix="/movie/"
    loadingLabel="Loading movies"
    radioGroupName="grade"
    notice={notice}
  />
);

export default Movies;
