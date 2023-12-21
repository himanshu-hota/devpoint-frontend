import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
// import { useValidateToken } from '../../query/react-query';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [userLoading, setUserLoading] = useState(false);
    // const { data, isPending: userLoading } = useValidateToken(token);

     

    useEffect(() => {
        setUserLoading(true);
        const tokenFromLocalStorage = localStorage.getItem('devPToken');

        if (tokenFromLocalStorage != null) {

            setToken(tokenFromLocalStorage);

            const fetchUserData = async () => {
                try {
                    const options = {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${token}` },

                    };
                    const API_ENDPOINT = import.meta.env.VITE_ENDPOINT;
                    const res = await fetch(`${API_ENDPOINT}/auth/profile`, options);
                    const data = await res.json();
                    console.log(data);
                    if (res.ok) {
                        setUser(data.data);
                        setIsLoggedIn(true);
                    }

                } catch (err) {
                    setIsLoggedIn(false);
                    setUser(null);
                    toast('You are not logged in, please log in to explore');

                }

            }
            
            fetchUserData();
        }
        setUserLoading(false);
    }, [setToken,token])



    const login = (userData, token) => {
        localStorage.setItem('devPToken', token);
        setUser(userData);
        setIsLoggedIn(true);

    };

    const logout = async () => {

        localStorage.removeItem('devPToken')
        setUser(null);
        setIsLoggedIn(false);
        toast('Logout successfull!!!');
      
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn, userLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider

