import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const NavLinks = ({to,text}) => {
    return <NavLink to={to} className={({ isActive, isPending }) =>
        isActive
            ? "text-blue-500"
            : isPending
                ? "text-red-600"
                : ""
    }>{text}</NavLink>
}

NavLinks.propTypes = {
    to:PropTypes.string,
    text: PropTypes.string,
}

export default NavLinks;