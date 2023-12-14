import { useDispatch, useSelector } from "react-redux";
import { selectGenreId, selectGenres } from "../../store/selectors/movieSelectors";
import { setGenreId, setInitialState, toggleGenrePopup } from "../../store/slices/movieSlice";

export default function GenresPopup() {

    const genres = useSelector(selectGenres);
    const dispatch = useDispatch();
    const movieGenreId = useSelector(selectGenreId);

    const setMovieGenre = (genreId) => {
        dispatch(setGenreId(genreId));
        dispatch(setInitialState());
        dispatch(toggleGenrePopup);
    }

    return (

        <div className="GenresPopup">
            {genres.length > 0 ? (
                <ul>
                    {genres.map((genre) => (
                        <li
                            onClick={() => setMovieGenre(genre.id)}
                            className={`${movieGenreId === genre.id ? 'active' : ''}`}
                            key={genre.id}
                        >{genre.name}</li>
                    ))}
                </ul>
            ) : (
                <p>There are no genres.</p>
            )}
        </div>

    );

}