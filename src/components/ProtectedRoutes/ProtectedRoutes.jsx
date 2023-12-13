import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const ProtectedRoutes = ({children}) => {
    
    const { isLoggedIn } = useAuth();

    if(!isLoggedIn) return <Navigate to={'/login'} replace={true} />

    return (<>
      {children}
    </>);
}

ProtectedRoutes.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProtectedRoutes;
