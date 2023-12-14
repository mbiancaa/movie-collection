import { useDispatch, useSelector } from "react-redux";
import { resetState, setInitialState } from "../../store/slices/movieSlice";
import { selectInitialState } from "../../store/selectors/movieSelectors";

export default function ResetButton() {

    const dispatch = useDispatch();
    const initialState = useSelector(selectInitialState);

    const resetOptions = () => {
        if (initialState) return;
        dispatch(setInitialState());
        dispatch(resetState());
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