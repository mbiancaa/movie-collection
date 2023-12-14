import { fetchMovieGenres } from "../../api/movieGenresFetching";
import { useDispatch, useSelector } from "react-redux";
import GenresPopup from "./GenresPopup";
import { selectIsDisplayingGenresPopup } from "../../store/selectors/movieSelectors";
import { toggleGenrePopup } from "../../store/slices/movieSlice";

export default function GenresToggle() {

    const dispatch = useDispatch();
    const isDisplayingGenresPopup = useSelector(selectIsDisplayingGenresPopup);

    const toggleGenres = () => {
        if (!isDisplayingGenresPopup) {
            fetchMovieGenres(dispatch);
        }
        dispatch(toggleGenrePopup());
    }

    return (

        <div className="FilterButtonContainer">
            <div
                className={`FilterButton ${isDisplayingGenresPopup ? 'active' : ''}`}
                onClick={toggleGenres}
            >Categories</div>
            {isDisplayingGenresPopup && (
                <GenresPopup />
            )}
        </div>

    );

}