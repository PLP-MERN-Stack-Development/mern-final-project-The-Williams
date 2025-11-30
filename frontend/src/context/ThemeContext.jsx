import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(false);

    // Load saved theme
    useEffect(() => {
        const saved = localStorage.getItem("darkMode");
        if (saved === "true") document.documentElement.classList.add("dark");
        setDark(saved === "true");
    }, []);

    const toggleDarkMode = () => {
        const newTheme = !dark;
        setDark(newTheme);

        if (newTheme) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem("darkMode", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ dark, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
