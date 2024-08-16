import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, selectCategories, selectFilter } from '../../store/MovieSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const filter = useSelector(selectFilter);

  const handleChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    dispatch(setFilter(value));
  };

  return (
    <select multiple={true} value={filter} onChange={handleChange}>
      {categories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  );
};

export default Filter;
