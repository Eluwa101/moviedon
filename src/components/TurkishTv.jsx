import React from 'react';
import { getTurkishTv } from '../services/tmdbService';
import MediaSection from './MediaSection';

const TurkishTv = () => (
  <MediaSection
    id="turkishtv"
    title="Turkish TV Shows"
    icon="fi fi-tr"
    fetchFn={getTurkishTv}
    linkPrefix="/tv/"
    loadingLabel="Loading turkish TV"
  />
);

export default TurkishTv;
