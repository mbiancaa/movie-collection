import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState, setInitialState } from "../../store/slices/movieSlice";
import { selectInitialState } from "../../store/selectors/movieSelectors";

export default function ResetButton() {

    const dispatch = useDispatch();
    const initialState = useSelector(selectInitialState);
    const [buttonClass, setButtonClass] = useState('inactive');

    const resetOptions = () => {
        if (initialState) return;
        dispatch(setInitialState());
        dispatch(resetState());
    }

    useEffect(() => {
        if (initialState) {
            setButtonClass('inactive');
            return;
        }

        setButtonClass('active');
    }, [initialState]);

    return (
        <div className={`FilterButtonContainer ${buttonClass} Reset`}>
            <div
                className={`FilterButton`}
                onClick={resetOptions}>
                Reset
            </div>
        </div>
    );

}