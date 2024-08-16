import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleLike, toggleDislike, removeMovie } from '../../store/MovieSlice';
import './MovieCard.css'; 

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  
  const handleLike = () => {
    dispatch(toggleLike(movie.id));
  };

  const handleDislike = () => {
    dispatch(toggleDislike(movie.id));
  };

  const handleRemove = () => {
    dispatch(removeMovie(movie.id));
  };

  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      <p>{movie.category}</p>
      <div className="rating">
        <button onClick={handleLike} className={`like-button ${movie.liked ? 'active' : ''}`}>
          👍
          <span>{movie.likes}</span>
        </button>
        <button onClick={handleDislike} className={`dislike-button ${movie.disliked ? 'active' : ''}`}>
          👎
          <span>{movie.dislikes}</span>
        </button>
      </div>
      <button onClick={handleRemove} className="remove-button">Remove</button>
    </div>
  );
};

export default MovieCard;
