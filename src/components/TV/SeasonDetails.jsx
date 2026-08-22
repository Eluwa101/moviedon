import React, { useState, useEffect } from 'react';
import { getSeasonEpisodes } from '../../services/tmdbService';
import PlaybackLink from '../PlaybackLink';
import PropTypes from 'prop-types';

const SeasonDetails = ({ tvShowId, seasonNumber }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchSeasonEpisodes = async () => {
      try {
        const seasonEpisodes = await getSeasonEpisodes(tvShowId, seasonNumber);
        setEpisodes(seasonEpisodes);
      } catch {
        setEpisodes([]);
      }
    };

    fetchSeasonEpisodes();
  }, [tvShowId, seasonNumber]);

  return (
    <div>
      <ul className='episode-ul'>
        {episodes.map((episode, index) => (
          <li className='episode-list' key={episode.id}>
            <PlaybackLink to={`/player/${tvShowId}?e=${index + 1}&s=${seasonNumber}`}>
            {episode.image && (
              <img
                draggable={'false'}
                src={episode.image}
                alt={`Episode ${episode.name}`}
                width="300"
                height="169"
                loading="lazy"
                decoding="async"
              />
            )}
            </PlaybackLink>
            
            
            <div className='episode-details'>
            <PlaybackLink to={`/player/${tvShowId}?e=${index + 1}&s=${seasonNumber}`}>
            <p>{index + 1}. {episode.name}</p>
            </PlaybackLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

SeasonDetails.propTypes = {
  tvShowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  seasonNumber: PropTypes.number.isRequired,
};

export default SeasonDetails;
