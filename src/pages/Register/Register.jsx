import Input from '../../components/Form/Input/Input';
import FormButton from '../../components/Form/FormButton/FormButton';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const Register = () => {

  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <Navigate to='/' replace={true} />

  const validateConfirmPassword = (value) => {
    const { password } = getValues();
    return value === password || 'Passwords do not match';
  };


  const onSubmit = async (data) => {
    const { name, email, password, confirmpassword } = data;
    try {
      setIsLoading(true);
      const options = {
        method: 'POST',
        body: JSON.stringify({ name, email, password, confirmpassword }),
        headers: { 'Content-Type': 'application/json' }
      }

      const res = await fetch('http://localhost:4000/auth/register', options)
      const data = await res.json();

      toast.dismiss();
      toast(data.message);
      if (res.ok) {
        navigate('/login');
      }
      setIsLoading(false);

    } catch (err) {
      toast(err.message);
    }
  }

  return (
    <section className="h-screen w-full flex justify-center items-center overflow-hidden">
      <form className='custom-form px-4 py-4 h-max w-[90%]' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='form-heading'>Register</h1>

        <Input type='text' placeholder='Enter your name here' register={register} label={'name'} validations={{ required: "Name is required" }} />
        {errors.name && <p role="alert">{errors.name?.message} </p>}

        <Input type='email' placeholder='Enter your email here' register={register} label={'email'} validations={{ required: "Email is required", minLength: 5 }} />
        {errors.email && <p role="alert">{errors.email?.message} {errors.email?.type === 'minLength' && 'Email must have at least 5 chararacters'} </p>}


        <Input type='password' placeholder='Enter your password here' register={register} label={'password'} validations={{ required: "Password is required", minLength: 8 }} />
        {errors.password && <p role="alert">{errors.password?.message} {errors.password?.type === 'minLength' && 'Password must have at least 8 chararacters'}</p>}

        <Input type='password' placeholder='Confirm Password' register={register} label={'confirmpassword'} validations={{ required: "Confirm-Password is required", minLength: 8, validate: validateConfirmPassword, }} />
        {errors.confirmpassword && <p role="alert">{errors.confirmpassword?.message}</p>}

        <FormButton disabled={isLoading}>{isLoading ? "Loading...." : 'Login'}</FormButton>

        <p className="">Already have an account ? <Link to={'/login'} className='underline italic '>Login</Link></p>

      </form>
    </section>
  )
}

export default Register;