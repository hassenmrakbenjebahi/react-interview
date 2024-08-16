import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, selectFilteredMovies, selectPage, selectItemsPerPage, selectTotalPages, setPage, setItemsPerPage} from './store/MovieSlice';
import MovieCard from './components/MovieCard/MovieCard';
import FilterBar from './components/Filter/FilterBar';
import Pagination from './components/Pagination/Pagination'; 
import './components/MovieList/MovieList.css';
const App = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectFilteredMovies);
  const page = useSelector(selectPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleItemsPerPageChange = (event) => {
    dispatch(setItemsPerPage(Number(event.target.value)));
  };

  return (
    <div className="app">
      <FilterBar />
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default App;
