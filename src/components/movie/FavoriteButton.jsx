import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from "../../store/slices/movieSlice";
import {
    selectIsFavorite,
    selectMoviePoster,
    selectMovieReleaseDate,
    selectMovieTitle
} from "../../store/selectors/movieSelectors";
import fullHeartImage from '../../assets/icons/full_heart.png';
import emptyHeartImage from '../../assets/icons/empty_heart.png';

export default function FavoriteButton(props) {

    const { movieId } = props;
    const dispatch = useDispatch();

    const isFavorite = useSelector((state) => selectIsFavorite(state, movieId));
    const movieReleaseDate = useSelector((state) => selectMovieReleaseDate(state, movieId));
    const movieTitle = useSelector((state) => selectMovieTitle(state, movieId));
    const posterPath = useSelector((state) => selectMoviePoster(state, movieId));

    const [isPulseAnimation, setIsPulseAnimation] = useState(false);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite({
            movieId: movieId,
            movieTitle: movieTitle,
            movieReleaseDate: movieReleaseDate,
            posterPath: posterPath,
            isFavorite: !isFavorite
        }));

        setIsPulseAnimation(true);
        setTimeout(() => {
            setIsPulseAnimation(false);
        }, 1000);
    };

    return (
        <div
            className={`FavoriteMovieButton ${isPulseAnimation ? 'active' : ''} ${isFavorite ? 'isFavorite' : ''}`}
            onClick={handleToggleFavorite}
        >
            <img
                className="HeartIcon"
                src={isFavorite ? fullHeartImage : emptyHeartImage}
                alt="heart icon" />
        </div>
    );

}