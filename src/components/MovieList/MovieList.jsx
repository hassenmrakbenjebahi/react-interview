import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, selectFilteredMovies } from '../store/movieSlice';
import MovieCard from './MovieCard';
const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectFilteredMovies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
