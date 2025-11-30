import { Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Navbar = () => {
    const { dark, toggleDarkMode } = useContext(ThemeContext);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <Link to="/" className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                RecipeHub
            </Link>

            <div className="flex gap-6 text-lg">
                <Link className="hover:text-orange-500 dark:hover:text-orange-400 transition" to="/">
                    Home
                </Link>

                <Link className="hover:text-orange-500 dark:hover:text-orange-400 transition" to="/create">
                    Create
                </Link>

                <Link className="hover:text-orange-500 dark:hover:text-orange-400 transition" to="/saved">
                    Saved
                </Link>

                <button
                    onClick={toggleDarkMode}
                    className="ml-4 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm"
                >
                    {dark ? "Light Mode" : "Dark Mode"}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
