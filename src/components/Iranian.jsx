import React from 'react';
import { getIranianMovies } from '../services/tmdbService';
import MediaSection from './MediaSection';

const Iranian = () => (
  <MediaSection
    id="iranian"
    title="Iranian Movies"
    icon="fi fi-ir"
    fetchFn={getIranianMovies}
    linkPrefix="/movie/"
    loadingLabel="Loading iranian"
  />
);

export default Iranian;
