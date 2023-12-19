import Input from '../../components/Form/Input/Input';
import FormButton from '../../components/Form/FormButton/FormButton';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {login,isLoggedIn} = useAuth();

    if(isLoggedIn) return <Navigate to='/'  />

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
            

            if(res.ok){
                toast(data.message);
                const token = data?.token;
                login(data.data,token);
                navigate('/');
            }else{
                toast(data.message);
            }

            
            
        } catch (err) {
            toast('Login Failed!!!!');
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <section className="h-screen w-full flex justify-center items-center overflow-hidden">
            <form className='custom-form px-4 py-6 h-max w-[90%]' onSubmit={handleSubmit(onSubmit)} >
                <h1 className='form-heading'>Login</h1>
                <Input type='email' placeholder='Enter your email here' register={register} label={'email'} validations={{ required: "Email is required", minLength: 5 }} />
                {errors.email && <p role="alert">{errors.email?.message} {errors.email?.type === 'minLength' && 'Email must have at least 5 chararacters'} </p>}


                <Input type='password' placeholder='Enter your password here' register={register} label={'password'} validations={{ required: "Password is required", minLength: 8 }} />
                {errors.password && <p role="alert">{errors.password?.message} {errors.password?.type === 'minLength' && 'Password must have at least 8 chararacters'}</p>}

                <FormButton disabled={isLoading}>{isLoading ? "Loading...." : 'Login'}</FormButton>

                <p className="">New to Dev-Point ? <Link to={'/register'} className='underline italic '>Register</Link></p>

            </form>
        </section>
    )
}

export default Login;