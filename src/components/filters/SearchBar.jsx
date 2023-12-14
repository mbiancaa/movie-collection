import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setInitialState } from "../../store/slices/movieSlice";
import { debounce } from 'lodash';
import { SEARCH_DEBOUNCE_TIME } from "../../constants";
import { selectSearchTerm } from "../../store/selectors/movieSelectors";

export default function SearchBar() {

    const [searchTermState, setSearchTermState] = useState('');
    const searchTerm = useSelector(selectSearchTerm);
    const isMounted = useRef(false);
    const dispatch = useDispatch();

    const dispatchSearch = useRef(debounce((term) => {
        dispatch(setInitialState());
        dispatch(setSearch(term));
    }, SEARCH_DEBOUNCE_TIME)).current;

    const handleChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTermState(newSearchTerm);
        dispatchSearch(newSearchTerm);
    };

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        setSearchTermState(searchTerm);
    }, [searchTerm]);

    const searchMovieByKeyword = (event) => {
        event.preventDefault();
        if ( searchTerm === '' || searchTermState === searchTerm ) return;
        dispatch(setSearch(searchTerm));
    };

    return (
        <div
            className="SearchForm"
            onSubmit={searchMovieByKeyword}>
            <input
                className="SearchInput"
                type="search"
                placeholder="Search for movie name.."
                value={searchTermState}
                onChange={handleChange}
            />
            <button
                className="SearchButton"
                type="submit"
            >Search</button>
        </div>
    );

}
