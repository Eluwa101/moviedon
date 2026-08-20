import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

const browseLinks = [
  { to: '/shorts', label: 'Shorts', isRoute: true },
  { href: '/#movies', label: 'Movies' },
  { href: '/#tvshows', label: 'TV Shows' },
  { href: '/#categories', label: 'Categories' },
  { href: '/#anime', label: 'Anime' },
  { to: '/my-list', label: 'My List', isRoute: true },
];

const legalLinks = [
  { href: '/about', label: 'About' },
  { href: '/dmca', label: 'DMCA' },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__glow"></div>

    <div className="site-footer__main">
      <div className="site-footer__brand">
        <Link to="/" className="site-footer__logo-link">
          <img src="/assets/logo2.png" alt="Logo" className="site-footer__logo" />
        </Link>
        <p className="site-footer__tagline">
          Moviedon is a free, and open-source streaming website. No account required — just pick something and watch.
        </p>
      </div>

      <div className="site-footer__columns">
        <div className="site-footer__col">
          <h4>Browse</h4>
          <ul>
            {browseLinks.map((link) => (
              <li key={link.label}>
                {link.isRoute ? (
                  <Link to={link.to}>{link.label}</Link>
                ) : (
                  <a href={link.href}>{link.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Important</h4>
          <ul>
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Notice</h4>
          <p className="site-footer__note">
            <i className="fa-solid fa-circle-info"></i> Please disable your ad blocker for the best experience.
          </p>
        </div>
      </div>
    </div>

    <div className="site-footer__bottom">
      <p>© {new Date().getFullYear()} Moviedon. All rights reserved. <br /> All trademarks, logos, images, and content belong to their respective owners.</p>
      <p className="site-footer__credit">
        Made with <span><i className='fas fa-heart footer-icon'></i></span> using React, TMDB API, <span><i className='fas fa-brain footer-icon'></i></span> & <span><i className='fas fa-coffee footer-icon'></i></span>
      </p>
      <span className="site-footer__version">v3.0</span>
    </div>
  </footer>
);

export default Footer;
