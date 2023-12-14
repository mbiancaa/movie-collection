import axios from "axios";
import { apiDiscoverUrl, apiKey, apiSearchUrl } from "./apiConfig";
import { handleError, loadMovies } from "../store/slices/movieSlice";

export const fetchMovies = async (dispatch, page, searchTerm, genreId) => {
    try {
        const response = await axios.get(searchTerm ? apiSearchUrl : apiDiscoverUrl, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                sort_by: 'popularity.desc',
                include_adult: false,
                include_video: false,
                page: page,
                query: searchTerm,
                with_genres: genreId
            },
        });
        if (response.data.total_pages < ++page) return;
        dispatch(loadMovies(response.data.results));
    } catch (error) {
        dispatch(handleError(error.message));
    }
};