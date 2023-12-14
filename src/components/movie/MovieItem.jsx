import { useSelector } from 'react-redux';
import {
    selectMovieTitle,
    selectMovieReleaseDate,
    selectMoviePoster
} from "../../store/selectors/movieSelectors";
import FavoriteButton from "./FavoriteButton";
import { formatReleaseDate } from "../../helpers";

export default function MovieItem(props) {

    const { movieId } = props;
    const title = useSelector((state) => selectMovieTitle(state, movieId));
    const posterPath = useSelector((state) => selectMoviePoster(state, movieId));
    const releaseDate = useSelector((state) => selectMovieReleaseDate(state, movieId));

    return (
        <div className="MovieItemContainer">
            <img className="MoviePoster" src={posterPath} alt={`${title} Movie Poster`} />
            <div className="MovieItemFooter">
                <div className="MovieItemInfoCol">
                    <p className="MovieItemInfo Title">{title}</p>
                </div>
                <FavoriteButton movieId={movieId} />
                <p className="MovieItemInfo ReleaseDate">Release date: {formatReleaseDate(releaseDate)}</p>
                <div className="MovieLinkButton">
                    <a target="_blank"
                        href={`https://www.themoviedb.org/movie/${movieId}-${title.toLowerCase().replace(/\s+/g, '-')}`}
                    >Check Movie Details</a>
                </div>
            </div>
        </div>
    );

}