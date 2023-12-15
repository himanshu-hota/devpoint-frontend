// ThemeContext.js

import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsDarkTheme(savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkTheme ? 'light' : 'dark';
        setIsDarkTheme(!isDarkTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children:PropTypes.node
}


export const useTheme = () => {
    return useContext(ThemeContext);
};
