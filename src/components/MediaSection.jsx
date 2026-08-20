import React from 'react';
import PropTypes from 'prop-types';
import SectionHeader from './SectionHeader';
import MediaGridCard from './MediaGridCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import { useMediaSection } from '../hooks/useMediaSection';
import '../styles/main.css';

const MediaSection = ({ id, title, icon, fetchFn, linkPrefix, loadingLabel }) => {
  const { items, currentPage, loading, handlePageChange } = useMediaSection(fetchFn);

  return (
    <section className="content-section" id={id}>
      <SectionHeader title={title} icon={icon} />

      {loading ? (
        <LoadingSpinner label={loadingLabel} />
      ) : (
        <div className="media-grid">
          {items.slice(0, 20).map((item) => (
            <MediaGridCard key={item.id} item={item} linkTo={`${linkPrefix}${item.id}`} />
          ))}
        </div>
      )}

      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </section>
  );
};

MediaSection.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  fetchFn: PropTypes.func.isRequired,
  linkPrefix: PropTypes.string.isRequired,
  loadingLabel: PropTypes.string.isRequired,
};

export default MediaSection;
