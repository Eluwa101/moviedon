import React from 'react';
import { getTurkishMovies } from '../services/tmdbService';
import MediaSection from './MediaSection';

const Turkish = () => (
  <MediaSection
    id="turkish"
    title="Turkish Movies"
    icon="fi fi-tr"
    fetchFn={getTurkishMovies}
    linkPrefix="/movie/"
    loadingLabel="Loading turkish"
  />
);

export default Turkish;
