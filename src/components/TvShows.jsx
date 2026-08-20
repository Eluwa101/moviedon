import React from 'react';
import {
  getTrendingTvShows,
  getPopularTvShows,
  getUpcomingTvShows,
} from '../services/tmdbService';
import FilterableMediaSection from './FilterableMediaSection';

const FILTERS = [
  { key: 'trending2', id: 'trending2', label: 'Trending', fetchFn: getTrendingTvShows },
  { key: 'popular2', id: 'popular2', label: 'Popular', fetchFn: getPopularTvShows },
  { key: 'upcoming2', id: 'upcoming2', label: 'Upcoming', fetchFn: getUpcomingTvShows },
];

const TvShows = () => (
  <FilterableMediaSection
    sectionId="tvshows"
    title="TV Shows"
    icon="fa-solid fa-tv"
    filters={FILTERS}
    linkPrefix="/tv/"
    loadingLabel="Loading TV shows"
    radioGroupName="grade2"
  />
);

export default TvShows;
