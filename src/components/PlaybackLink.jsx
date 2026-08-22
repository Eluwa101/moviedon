import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/PlaybackLink.css';

const HOVER_NOTICE_DURATION = 5000;

const PlaybackLink = ({ children, ...linkProps }) => {
  const [showNotice, setShowNotice] = useState(false);
  const dismissTimer = useRef(null);

  const showHoverNotice = () => {
    window.clearTimeout(dismissTimer.current);
    setShowNotice(true);
    dismissTimer.current = window.setTimeout(() => setShowNotice(false), HOVER_NOTICE_DURATION);
  };

  useEffect(() => () => window.clearTimeout(dismissTimer.current), []);

  return (
    <>
      <Link {...linkProps} onMouseEnter={showHoverNotice} onFocus={showHoverNotice}>
        {children}
      </Link>
      {showNotice && createPortal(
        <div className="playback-link-notice" role="status" aria-live="polite">
          Ads may open before playback starts.
        </div>,
        document.body,
      )}
    </>
  );
};

PlaybackLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlaybackLink;
