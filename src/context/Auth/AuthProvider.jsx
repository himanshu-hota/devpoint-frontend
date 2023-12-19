import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const isTokenValid = async (token) => {
        try {
            const tokenInfo = {token};
            const options = {
                method:'POST',
                body:JSON.stringify(tokenInfo),
                headers: { 'Content-Type': 'application/json' },
                
            };
            const res = await fetch('http://localhost:4000/auth/profile', options);
            const data = await res.json();
            if (res.ok) {
                setUser(data.data);
                setIsLoggedIn(true);
            }else{
                localStorage.removeItem('devPToken')
            }

            
        } catch (err) {
            toast('Something went wrong!!!');
        }
    };

    useEffect(() => {

        const token = localStorage.getItem('devPToken');
        
        if(token){
            isTokenValid(token);
        }else{
            setUser(null);
            setIsLoggedIn(false);
        }

        


    }, [])


    const login = (userData,token) => {
        localStorage.setItem('devPToken', token);
        setUser(userData);
        setIsLoggedIn(true);
        
    };

    const logout = async () => {
        try {
            const options = {
                method:'POST',
                credentials: 'include'
            };
            await fetch('http://localhost:4000/auth/logout', options);
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

