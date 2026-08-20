import React from 'react';
import { getAnimeMovies } from '../services/tmdbService';
import MediaSection from './MediaSection';

const Anime = () => (
  <MediaSection
    id="anime"
    title="Anime Movies"
    icon="fi fi-jp"
    fetchFn={getAnimeMovies}
    linkPrefix="/movie/"
    loadingLabel="Loading anime"
  />
);

export default Anime;
