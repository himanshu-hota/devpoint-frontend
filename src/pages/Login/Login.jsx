import styles from './Login.module.css';
import Input from '../../components/Form/Input/Input';
import FormButton from '../../components/Form/FormButton/FormButton';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {login,isLoggedIn} = useAuth();

    if(isLoggedIn) return <Navigate to='/' replace={true} />

    const onSubmit = async (data) => {
        setIsLoading(true);
        const {email,password} = data;
        try {

            const options = {
                method:'POST',
                body:JSON.stringify({email,password}),
                headers:{'Content-Type':'application/json'},
                credentials:'include'
            }

            const res = await fetch('http://localhost:4000/auth/login', options);
            const data = await res.json();
                        
            toast.dismiss();
            setIsLoading(false);

            if(res.ok){
                toast(data.message);
                login(data.data);
                navigate('/');
            }
            
        } catch (err) {
            setIsLoading(false);
            toast(err.message);
        }

    }

    return (
        <form className={styles.login} onSubmit={handleSubmit(onSubmit)} >
            <h1 className={styles.formHeading}>Login</h1>
            <Input type='email' placeholder='Enter your email here' register={register} label={'email'} validations={{ required: "Email is required", minLength: 5 }} />
            {errors.email && <p role="alert">{errors.email?.message} {errors.email?.type === 'minLength' && 'Email must have at least 5 chararacters'} </p>}


            <Input type='password' placeholder='Enter your password here' register={register} label={'password'} validations={{ required: "Password is required", minLength: 8 }} />
            {errors.password && <p role="alert">{errors.password?.message} {errors.password?.type === 'minLength' && 'Password must have at least 8 chararacters'}</p>}

            <FormButton disabled={isLoading}>{isLoading ? "Loading...." : 'Login'}</FormButton>
        </form>
    )
}

export default Login;