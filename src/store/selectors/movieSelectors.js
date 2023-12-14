import posterPlaceholder from '../../assets/movie_placeholder.png';
export const selectMoviePoster = (state, movieId) => {
    const posterPath = selectMovie(state, movieId)?.poster_path;
    if (posterPath == null) return posterPlaceholder;
    return `https://image.tmdb.org/t/p/w200${posterPath}`;
};
export const selectMovie = (state, movieId) => state.movie.movies?.find((movie) => movie.id === movieId);
export const selectMovieReleaseDate = (state, movieId) => selectMovie(state, movieId)?.release_date || 'N/A';
export const selectMovieTitle = (state, movieId) => selectMovie(state, movieId)?.title || '';
export const selectIsFavorite = (state, movieId) => selectMovie(state, movieId)?.isFavorite || false;
export const selectSearchTerm = (state) => state.movie.searchTerm || '';
export const selectGenres = (state) => state.movie.genres;
export const selectGenreId = (state) => state.movie.genreId;
export const selectIsDisplayingGenresPopup = (state) => state.movie.isDisplayingGenresPopup;
export const selectIsDisplayingFavorites = (state) => state.movie.isDisplayingFavorites;