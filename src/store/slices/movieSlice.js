import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        movies: [],
        page: 1,
        error: null,
        searchTerm: '',
        genres: [],
        genreId: null,
        isDisplayingFavorites: false,
        isDisplayingGenresPopup: false,
    },
    reducers: {
        loadMovies: (state, action) => {
            if (state.page === 1) movieSlice.caseReducers.resetMovies(state);
            const newMovies = action.payload.map((movie) => {
                const isFavorite = JSON.parse(sessionStorage.getItem('favoriteMovies'))?.find(item => item.id === movie.id) || false;
                return {
                    ...movie,
                    isFavorite: isFavorite
                };
            });
            state.movies = [...state.movies, ...newMovies];
            state.page += 1;
            state.error = null;
        },
        resetState: (state) => {
            state.isDisplayingFavorites = false;
            state.isDisplayingGenresPopup = false;
            state.searchTerm = '';
            state.page = 1;
            state.movies = [];
            state.error = false;
        },
        resetMovies: (state) => state.movies = [],
        handleError: (state, action) => {
            state.error = action.payload;
        },
        toggleFavorite: (state, action) => {
            const { movieId, movieTitle, movieReleaseDate, posterPath, isFavorite } = action.payload;
            const movieIndex = state.movies.findIndex((movie) => movie.id === movieId);

            if (movieIndex !== -1) {
                state.movies[movieIndex].isFavorite = isFavorite;

                const favoriteMovies = JSON.parse(sessionStorage.getItem('favoriteMovies')) || [];

                if (isFavorite) {
                    favoriteMovies.push({
                        id: movieId,
                        title: movieTitle,
                        release_date: movieReleaseDate,
                        poster_path: posterPath,
                        isFavorite: isFavorite
                    });
                } else {
                    const indexToRemove = favoriteMovies.indexOf(favoriteMovies.find(movie => movie.id === movieId));
                    if (indexToRemove !== -1) {
                        favoriteMovies.splice(indexToRemove, 1);
                    }
                }

                sessionStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
                if (!isFavorite && state.isDisplayingFavorites) movieSlice.caseReducers.displayFavorites(state);
            }
        },
        displayFavorites:  (state) => {
            movieSlice.caseReducers.resetState(state);
            state.movies = JSON.parse(sessionStorage.getItem('favoriteMovies')) || [];
            state.isDisplayingFavorites = true;
        },
        loadGenres: (state, action) => {
            state.genres = action.payload;
        },
        setGenreId: (state, action) => {
            let newGenreId = action.payload;
            if ( state.genreId === newGenreId ) newGenreId = null;
            movieSlice.caseReducers.resetState(state);
            state.genreId = newGenreId;
        },
        toggleGenrePopup: (state) => {
          state.isDisplayingGenresPopup = !state.isDisplayingGenresPopup;
        },
        setSearch: (state, action) => {
            movieSlice.caseReducers.resetState(state);
            state.searchTerm = action.payload;
        }
    },
});

export const {
    resetState,
    loadMovies,
    handleError,
    toggleFavorite,
    loadGenres,
    setGenreId,
    toggleGenrePopup,
    displayFavorites,
    setSearch
} = movieSlice.actions;
export default movieSlice.reducer;