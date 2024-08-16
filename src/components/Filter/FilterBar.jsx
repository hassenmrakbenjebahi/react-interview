import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories, toggleCategoryFilter } from '../../store/MovieSlice';
import './FilterBar.css'; 

const FilterBar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const selectedCategories = useSelector(state => state.movies.filter);

  const handleCategoryChange = (category) => {
    dispatch(toggleCategoryFilter(category));
  };

  return (
    <div className="filter-bar">
      {categories.map(category => (
        <label key={category} className="filter-item">
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          {category}
        </label>
      ))}
    </div>
  );
};

export default FilterBar;
