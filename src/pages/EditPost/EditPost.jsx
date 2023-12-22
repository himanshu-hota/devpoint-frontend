import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Form/Input/Input";
import FormButton from "../../components/Form/FormButton/FormButton";
import ReactQuillComp from "../../components/Form/Quill/ReactQuill";
import { useGetBlog, useUpdateBlog } from '../../query/react-query.js';
import Error from '../ErrorPage/Error';
import Loading from '../../components/LazyLoader/Loading';

const EditPost = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [textAreaContent, setTextAreaContent] = useState('');
    const navigate = useNavigate();

    const { postId } = useParams();
    const { data, error, isError, isPending } = useGetBlog(postId);
    const {mutate,isPending:isLoading} = useUpdateBlog(navigate,postId);

    useEffect(() => {
        if (data) {
            setValue('title', data.post.title);
            setValue('summary', data.post.summary);
            setTextAreaContent(data.post.content);
        }
    }, [data, setValue]);

    const onSubmit = async (data) => {

        mutate({ ...data, postId, textAreaContent });

    }

    return (
        <section className="edit-post w-full h-screen py-20 md:pb-5 ">

            {isPending && <Loading />}
            {isError && <Error message={error.message} />}

            {data && <form className='custom-form p-4  mx-auto h-full w-[90%] overflow-scroll relative' onSubmit={handleSubmit(onSubmit)} >

                <h1 className='form-heading'>Edit blog</h1>
                <Input type='text' placeholder='Enter your title here' register={register} label={'title'} validations={{ required: "Title is required", minLength: 5, maxLength: 50 }} />
                {errors.title && <p role="alert">{errors.title?.message} {errors.title?.type === 'minLength' && 'Title must have at least 5 chararacters'} </p>}


                <Input type='text' placeholder='Enter your summary here' register={register} label={'summary'} validations={{ required: "Summary is required", minLength: 8, maxLength: 50 }} />
                {errors.summary && <p role="alert">{errors.summary?.message} {errors.summary?.type === 'minLength' && 'Summary must have at least 8 chararacters'}</p>}

                <div className="w-full">
                    <Input type='file' register={register} label={'file'} />
                    {errors.file && <p role="alert">{errors.file?.message} </p>}
                </div>

                <div className="qul w-full">
                    <ReactQuillComp value={textAreaContent} onChange={setTextAreaContent} />
                </div>



                <FormButton disabled={isLoading}>{isLoading ? "Loading...." : 'Update Post'}</FormButton>


            </form>}



        </section>
    )
}

export default EditPost;