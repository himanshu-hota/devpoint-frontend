import Input from '../../components/Form/Input/Input';
import FormButton from '../../components/Form/FormButton/FormButton';
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from 'react-router-dom';
 import useAuth from '../../hooks/useAuth';
import { useLogin } from '../../query/react-query';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const {login,isLoggedIn} = useAuth();
    const {mutate,isPending:isLoading} = useLogin(navigate);

    if(isLoggedIn) return <Navigate to='/'  />

    const onSubmit = async (formData) => {
      mutate({formData,login});
    }

    return (
        <section className="h-full w-full md:w-[60%] md:mx-auto flex justify-center items-center">
            <form className='custom-form px-4 py-6 h-max w-[90%] mx-auto' onSubmit={handleSubmit(onSubmit)} >
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