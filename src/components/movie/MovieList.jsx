import React from 'react';
import { useSelector } from 'react-redux';
import MovieItem from "./MovieItem";

export default function MovieList(props) {

    const { movies, error } = useSelector((state) => state.movie);
    const { isLoading } = props;

    return (
        <>
            <div className={`MovieListContainer ${isLoading ? 'LoadingMovies' : ''}`}>
                {!isLoading && movies.length <= 0 ? (
                    <p>There are no results matching your criteria.</p>
                ) : (
                    movies.map((movie, index) => (
                        <MovieItem key={index} movieId={movie.id} />
                    ))
                )}
            </div>
            {error && <p>Error: {error}</p>}
        </>
    );

}