/**
 * Movie API Configuration
 *
 * This file contains constants and endpoints to interact with The Movie Database (TMDb) API
 */

const BASE_URL = 'https://api.themoviedb.org/3';
export const apiKey = 'cfa423f0c3016ce1a9ea199241b04724';
export const apiDiscoverUrl = BASE_URL + '/discover/movie';
export const apiSearchUrl = BASE_URL + '/search/movie';
export const apiMovieGenresUrl = BASE_URL + '/genre/movie/list';