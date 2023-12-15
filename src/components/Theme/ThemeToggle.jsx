import { useTheme } from '../../context/ThemeContext/ThemeContext';
import { FaSun } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa";
import PropTypes from 'prop-types';

const ThemeToggle = ({classes}) => {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className={classes}>
            {isDarkTheme ? <FaSun /> : <FaRegMoon  />}
        </button>
    );
};


ThemeToggle.propTypes = {
    classes: PropTypes.node
}


export default ThemeToggle;
