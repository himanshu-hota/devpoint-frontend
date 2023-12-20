import Input from '../../components/Form/Input/Input';
import FormButton from '../../components/Form/FormButton/FormButton';
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useRegister } from '../../query/react-query';


const Register = () => {

  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const {mutate,isPending:isLoading} = useRegister(navigate);

  if (isLoggedIn) return <Navigate to='/' replace={true} />

  const validateConfirmPassword = (value) => {
    const { password } = getValues();
    return value === password || 'Passwords do not match';
  };

  const onSubmit = async (formData) => {
    mutate({formData});
  }

  return (
    <section className="h-full w-full flex justify-center items-center">
      <form className='custom-form h-max w-[90%] md:w-[50%] mx-auto px-4 py-4 ' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='form-heading'>Register</h1>
        
        <Input type='text' placeholder='Enter your name here' register={register} label={'name'} validations={{ required: "Name is required" }} />
        {errors.name && <p role="alert">{errors.name?.message} </p>}

        <Input type='email' placeholder='Enter your email here' register={register} label={'email'} validations={{ required: "Email is required", minLength: 5 }} />
        {errors.email && <p role="alert">{errors.email?.message} {errors.email?.type === 'minLength' && 'Email must have at least 5 chararacters'} </p>}


        <Input type='password' placeholder='Enter your password here' register={register} label={'password'} validations={{ required: "Password is required", minLength: 8 }} />
        {errors.password && <p role="alert">{errors.password?.message} {errors.password?.type === 'minLength' && 'Password must have at least 8 chararacters'}</p>}

        <Input type='password' placeholder='Confirm Password' register={register} label={'confirmpassword'} validations={{ required: "Confirm-Password is required", minLength: 8, validate: validateConfirmPassword, }} />
        {errors.confirmpassword && <p role="alert">{errors.confirmpassword?.message}</p>}

        <FormButton disabled={isLoading}>{isLoading ? "Loading...." : 'Register'}</FormButton>

        <p className="">Already have an account ? <Link to={'/login'} className='underline italic '>Login</Link></p>

      </form>
    </section>
  )
}

export default Register;