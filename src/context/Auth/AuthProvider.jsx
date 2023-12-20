import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {useValidateToken} from '../../query/react-query';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const token = localStorage.getItem('devPToken');
    
    const {data} = useValidateToken(token);

    useEffect(() => {
        
        if (data){
            setUser(data.data);
            setIsLoggedIn(true);
        }else{
            setUser(null);
            setIsLoggedIn(false);
        }

    }, [data])


    const login = (userData,token) => {
        localStorage.setItem('devPToken', token);
        setUser(userData);
        setIsLoggedIn(true);
        
    };

    const logout = async () => {

        const API_ENDPOINT = import.meta.env.VITE_ENDPOINT;
        try {
            const options = {
                method:'POST',
                credentials: 'include'
            };
            await fetch(`${API_ENDPOINT}/auth/logout`, options);
            localStorage.removeItem('devPToken')
            setUser(null);
            setIsLoggedIn(false);
        } catch (err) {
            
            toast('Log out failed!!!');
        }
    };


    return (
        <AuthContext.Provider value={{ user, login, logout,isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider

