import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useContinueWatching } from '../context/ContinueWatchingContext';
import { getMovieQuickInfo, getTvQuickInfo } from '../services/tmdbService';
import '../styles/Player.css';

const Player = () => {
  const { id: routeId } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id') || routeId || '';
  const season = queryParams.get('s') || '';
  const episode = queryParams.get('e') || '';
  const { addToContinueWatching } = useContinueWatching();
  const [showAdNotice, setShowAdNotice] = useState(true);

  useEffect(() => {
    const dismissTimer = window.setTimeout(() => setShowAdNotice(false), 120000);
    return () => window.clearTimeout(dismissTimer);
  }, []);

  useEffect(() => {
    const trackWatch = async () => {
      if (!id) return;

      try {
        const item = season && episode
          ? await getTvQuickInfo(id)
          : await getMovieQuickInfo(id);

        if (season && episode) {
          item.season = Number(season);
          item.episode = Number(episode);
        }
        addToContinueWatching(item);
      } catch {
        // Playback remains available if tracking metadata cannot be loaded.
      }
    };

    trackWatch();
  }, [id, season, episode, addToContinueWatching]);

  const isEpisode = Boolean(season && episode);
  const embedUrl = isEpisode
    ? `https://multiembed.mov/?video_id=${encodeURIComponent(id)}&tmdb=1&s=${encodeURIComponent(season)}&e=${encodeURIComponent(episode)}`
    : `https://multiembed.mov/?video_id=${encodeURIComponent(id)}&tmdb=1`;
  const detailsUrl = isEpisode ? `/tv/${id}` : `/movie/${id}`;

  return (
    <main className="player">
      <iframe
        title="Moviedon video player"
        src={embedUrl}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />

      <nav className="overlay" aria-label="Player navigation">
        <Link to="/" aria-label="Back to home">
          <i className="fa-solid fa-home" aria-hidden="true"></i>
        </Link>
        <Link to={detailsUrl} aria-label="Back to title details">
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </Link>
      </nav>

      {showAdNotice && (
        <aside className="player-ad-notice" role="status" aria-live="polite">
          <p>Heads up: an ad may open before your movie starts.</p>
          <button type="button" onClick={() => setShowAdNotice(false)} aria-label="Dismiss notice">
            Got it
          </button>
        </aside>
      )}
    </main>
  );
};

export default Player;
