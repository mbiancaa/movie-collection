import { useDispatch, useSelector } from "react-redux";
import { displayFavorites, resetState } from "../../store/slices/movieSlice";
import { selectIsDisplayingFavorites } from "../../store/selectors/movieSelectors";

export default function FavoritesButton() {

    const dispatch = useDispatch();
    const isFavoriteButtonToggled = useSelector(selectIsDisplayingFavorites);

    const toggleFavorites = () => {
        if (!isFavoriteButtonToggled) {
            dispatch(displayFavorites());
        } else {
            dispatch(resetState());
        }
    }

    return (
        <div className="FilterButtonContainer">
            <div
                className={`FilterButton ${isFavoriteButtonToggled ? 'active' : ''}`}
                onClick={toggleFavorites}>
                Favorites
            </div>
        </div>
    );

}