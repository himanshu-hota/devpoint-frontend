import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Input from '../../components/Form/Input/Input';
import FormButton from '../../components/Form/FormButton/FormButton';
import useAuth from '../../hooks/useAuth';
import { useUpdateProfile } from '../../query/react-query';

const EditProfile = () => {

    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm();
    const [updatePassword, setUpdatePassword] = useState(false)
    const navigate = useNavigate();
    const { user } = useAuth();
    const { mutate,isPending:isLoading } = useUpdateProfile(navigate);


    useEffect(() => {
        setValue('name', user?.name);
    }, [setValue, user]);

    const validateConfirmPassword = (value) => {
        const { password } = getValues();
        return value === password || 'Passwords do not match';
    };
    
    const onSubmit = async (values) => {
       
        mutate(values);

        toast.dismiss();


    }


    return (
        <section className="h-full w-full py-20 mt-5 flex justify-center items-center">
            <form className='custom-form px-4 py-6 h-max w-[90%] ' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='form-heading'>Update Profile</h1>

                <Input type='text' placeholder='Enter your name here' register={register} label={'name'} validations={{ required: "Name is required" }} />
                {errors.name && <p role="alert">{errors.name?.message} </p>}

                <div className='w-full'>
                    <Input type='file' register={register} label={'file'} />
                </div>

                <Input type='password' placeholder='Enter current password here' register={register} label={'currentpassword'} validations={{ required: "Current password is required", minLength: 8 }} />
                {errors.currentpassword && <p role="alert">{errors.currentpassword?.message} {errors.currentpassword?.type === 'minLength' && 'Password must have at least 8 chararacters'}</p>}


                {!updatePassword ? (
                    <p className="text-sm underline cursor-pointer" onClick={() => setUpdatePassword(!updatePassword)}>Click here to Update Password</p>
                ) : (<>
                    <Input type='password' placeholder='Enter new password here' register={register} label={'password'} validations={{ required: "Password is required", minLength: 8 }} />
                    {errors.password && <p role="alert">{errors.password?.message} {errors.password?.type === 'minLength' && 'Password must have at least 8 chararacters'}</p>}

                    <Input type='password' placeholder='Confirm Password' register={register} label={'confirmpassword'} validations={{ required: "Confirm-Password is required", minLength: 8, validate: validateConfirmPassword, }} />
                    {errors.confirmpassword && <p role="alert">{errors.confirmpassword?.message}</p>}
                </>
                )}

                {updatePassword && <p className="underline cursor-pointer text-sm" onClick={() => setUpdatePassword(!updatePassword)}>No need to update password</p>}
                <FormButton disabled={isLoading}>{isLoading ? "Loading...." : 'Update'}</FormButton>

            </form>
        </section>
    )
}

export default EditProfile