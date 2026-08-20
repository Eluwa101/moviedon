import React from 'react';
import { getAnimeTv } from '../services/tmdbService';
import MediaSection from './MediaSection';

const AnimeTv = () => (
  <MediaSection
    id="animetv"
    title="Anime TV Shows"
    icon="fi fi-jp"
    fetchFn={getAnimeTv}
    linkPrefix="/tv/"
    loadingLabel="Loading anime TV"
  />
);

export default AnimeTv;
