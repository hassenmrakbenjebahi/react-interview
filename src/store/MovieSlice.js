import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movies$ } from '../data/movies';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await movies$;
  return response;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    allMovies: [],
    filter: [], // Tableau de catégories filtrées
    page: 1,
    itemsPerPage: 4,
  },
  reducers: {
    toggleLike: (state, action) => {
      const movie = state.allMovies.find(movie => movie.id === action.payload);
      if (movie) {
        if (movie.liked) {
          movie.likes--;
          movie.liked = false;
        } else if (movie.disliked) {
          movie.dislikes--;
          movie.disliked = false;
          movie.likes++;
          movie.liked = true;
        } else {
          movie.likes++;
          movie.liked = true;
        }
      }
    },
    toggleDislike: (state, action) => {
      const movie = state.allMovies.find(movie => movie.id === action.payload);
      if (movie) {
        if (movie.disliked) {
          movie.dislikes--;
          movie.disliked = false;
        } else if (movie.liked) {
          movie.likes--;
          movie.liked = false;
          movie.dislikes++;
          movie.disliked = true;
        } else {
          movie.dislikes++;
          movie.disliked = true;
        }
      }
    },
    removeMovie: (state, action) => {
      state.allMovies = state.allMovies.filter(movie => movie.id !== action.payload);
    },
    toggleCategoryFilter: (state, action) => {
      const category = action.payload;
      if (state.filter.includes(category)) {
        state.filter = state.filter.filter(cat => cat !== category);
      } else {
        state.filter.push(category);
      }
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.allMovies = action.payload;
    });
  },
});

export const { toggleLike, toggleDislike, removeMovie, toggleCategoryFilter, setPage, setItemsPerPage } = movieSlice.actions;

export const selectFilteredMovies = (state) => {
  const { allMovies, filter, page, itemsPerPage } = state.movies;
  const filteredMovies = filter.length === 0 ? allMovies : allMovies.filter(movie => filter.includes(movie.category));
  const startIndex = (page - 1) * itemsPerPage;
  return filteredMovies.slice(startIndex, startIndex + itemsPerPage);
};

export const selectCategories = (state) => {
  return [...new Set(state.movies.allMovies.map(movie => movie.category))];
};

export const selectFilter = (state) => state.movies.filter;
export const selectPage = (state) => state.movies.page;
export const selectItemsPerPage = (state) => state.movies.itemsPerPage;
export const selectTotalPages = (state) => {
  const filteredMovies = state.movies.filter.length === 0
    ? state.movies.allMovies
    : state.movies.allMovies.filter(movie => state.movies.filter.includes(movie.category));
  return Math.ceil(filteredMovies.length / state.movies.itemsPerPage);
};

export default movieSlice.reducer;
