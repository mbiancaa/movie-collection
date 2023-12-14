import React, {
    useEffect,
    useRef,
    useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieList from './components/movie/MovieList';
import SearchBar from './components/filters/SearchBar';
import Filters from "./components/filters/Filters";
import { fetchMovies } from "./api/movieFetching";
import { SCROLL_THRESHOLD } from "./constants";
import './App.css';
import { selectSearchTerm } from "./store/selectors/movieSelectors";

export default function App() {

    const [verticalScroll, setVerticalScroll] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const { page, error, isDisplayingFavorites, genreId, initialState } = useSelector((state) => state.movie);
    const searchTerm = useSelector(selectSearchTerm);

    const refs = {
        isMounted: useRef(false),
        prevSearchTerm: useRef(searchTerm),
        prevVerticalScroll: useRef(verticalScroll),
        prevDispatch: useRef(dispatch),
        prevDisplayingFavorites: useRef(isDisplayingFavorites),
        prevGenreId: useRef(genreId),
        prevInitialState: useRef(initialState),
    };

    const updateScroll =  () => {
        if ( !isDisplayingFavorites &&
            window.innerHeight + document.documentElement.scrollTop + SCROLL_THRESHOLD >=
            document.documentElement.offsetHeight
        ) {
            setVerticalScroll(document.documentElement.scrollTop);
        }
    };

    const updateMovies = () => {
        if (isLoading) return;
        setIsLoading(true);
        fetchMovies(dispatch, page, searchTerm, genreId).finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (!refs.isMounted.current) return;
        const shouldUpdateMovies =
            (refs.prevSearchTerm.current !== searchTerm ||
                refs.prevVerticalScroll.current !== verticalScroll ||
                refs.prevDispatch.current !== dispatch ||
                refs.prevGenreId.current !== genreId ||
                refs.prevInitialState.current !== initialState ||
                (refs.prevDisplayingFavorites.current !== isDisplayingFavorites &&
                    refs.prevDisplayingFavorites.current)) &&
            !isDisplayingFavorites;

        if (shouldUpdateMovies) {
            updateMovies();
        }

        refs.prevSearchTerm.current = searchTerm;
        refs.prevVerticalScroll.current = verticalScroll;
        refs.prevDispatch.current = dispatch;
        refs.prevDisplayingFavorites.current = isDisplayingFavorites;
        refs.prevGenreId.current = genreId;
        refs.prevInitialState.current = initialState;
    }, [searchTerm, verticalScroll, dispatch, isDisplayingFavorites, genreId, initialState]);

    useEffect(() => {
        if (!refs.isMounted.current) {
            updateMovies();
        }
        refs.isMounted.current = true;
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
        return () => {
            window.removeEventListener('scroll', updateScroll);
        };
    }, [verticalScroll, page]);

    return (
        <div className="App">
            <SearchBar />
            <Filters />
            <MovieList isLoading={isLoading}/>
            {error && <p>Error: {error}</p>}
        </div>
    );

}