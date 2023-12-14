import axios from "axios";
import { apiKey, apiMovieGenresUrl } from "./apiConfig";
import { handleError, loadGenres } from "../store/slices/movieSlice";

export const fetchMovieGenres = async (dispatch) => {
    try {
        const response = await axios.get(apiMovieGenresUrl, {
            params: {
                api_key: apiKey
            },
        });
        dispatch(loadGenres(response.data.genres));
    } catch (error) {
        dispatch(handleError(error.message));
    }
};