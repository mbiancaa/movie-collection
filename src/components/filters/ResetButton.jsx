import { useDispatch } from "react-redux";
import { setSearch } from "../../store/slices/movieSlice";

export default function ResetButton() {

    const dispatch = useDispatch();

    const resetOptions = () => {
        dispatch(setSearch(''));
    }

    return (
        <div className="FilterButtonContainer Reset">
            <div
                className={`FilterButton`}
                onClick={resetOptions}>
                Reset
            </div>
        </div>
    );

}