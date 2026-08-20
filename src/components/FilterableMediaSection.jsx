import React from 'react';
import PropTypes from 'prop-types';
import SectionHeader from './SectionHeader';
import MediaGridCard from './MediaGridCard';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import { useFilteredMediaSection } from '../hooks/useFilteredMediaSection';
import '../styles/main.css';

const FilterableMediaSection = ({
  sectionId,
  title,
  icon,
  filters,
  linkPrefix,
  loadingLabel,
  radioGroupName,
  notice = null,
}) => {
  const { items, currentPage, loading, selectedKey, selectFilter, handlePageChange } =
    useFilteredMediaSection(filters);

  return (
    <section className="content-section" id={sectionId}>
      {notice}

      <SectionHeader title={title} icon={icon}>
        <div className="filter-radios">
          {filters.map((filter) => (
            <React.Fragment key={filter.id}>
              <input
                type="radio"
                name={radioGroupName}
                id={filter.id}
                checked={selectedKey === filter.key}
                onChange={() => selectFilter(filter.key)}
              />
              <label htmlFor={filter.id}>{filter.label}</label>
            </React.Fragment>
          ))}
          <div className="checked-radio-bg" />
        </div>
      </SectionHeader>

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

FilterableMediaSection.propTypes = {
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      fetchFn: PropTypes.func.isRequired,
    })
  ).isRequired,
  linkPrefix: PropTypes.string.isRequired,
  loadingLabel: PropTypes.string.isRequired,
  radioGroupName: PropTypes.string.isRequired,
  notice: PropTypes.node,
};

export default FilterableMediaSection;
