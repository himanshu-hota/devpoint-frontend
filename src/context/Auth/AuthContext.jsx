import {createContext} from 'react'

const INTIAL_CONTEXT = {
    user:{
        username:'',
        email:''
    },
    login:() => {},
    logout:() => {},
    isLoggedIn:false
}

const AuthContext = createContext(INTIAL_CONTEXT);

export default AuthContext;

