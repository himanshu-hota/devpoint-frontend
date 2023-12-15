import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        const isTokenValid = async () => {
            try {
                const options = {
                    credentials: 'include'
                };
                const res = await fetch('http://localhost:4000/auth/profile', options);
                const data = await res.json();
                if(res.ok){
                    setUser(data.data);
                    setIsLoggedIn(true);
                }

            } catch (err) {
                toast('Something went wrong!!!');
            }
        };

        isTokenValid();


    }, [])


    const login = (userData) => {
        setUser(userData);
        if(userData.email){
            setIsLoggedIn(true);
        }
        
    };

    const logout = async () => {
        try {
            const options = {
                method:'POST',
                credentials: 'include'
            };
            await fetch('http://localhost:4000/auth/logout', options);
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

