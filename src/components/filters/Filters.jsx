import FavoritesButton from "./FavoritesButton";
import GenresToggle from "./GenresToggle";
import ResetButton from "./ResetButton";

export default function Filters() {

    return (
        <div className="FilterButtons">
            <GenresToggle />
            <FavoritesButton />
            <ResetButton />
        </div>
    );

}