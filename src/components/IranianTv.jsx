import React from 'react';
import { getIranianTv } from '../services/tmdbService';
import MediaSection from './MediaSection';

const IranianTv = () => (
  <MediaSection
    id="iraniantv"
    title="Iranian TV Shows"
    icon="fi fi-ir"
    fetchFn={getIranianTv}
    linkPrefix="/tv/"
    loadingLabel="Loading iranian TV"
  />
);

export default IranianTv;
