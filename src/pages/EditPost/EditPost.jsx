import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import Input from "../../components/Form/Input/Input";
import FormButton from "../../components/Form/FormButton/FormButton";
import ReactQuillComp from "../../components/Form/Quill/ReactQuill";


const EditPost = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [textAreaContent, setTextAreaContent] = useState('');
    const navigate = useNavigate();
    const { postId } = useParams();

    useEffect(() => {

        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:4000/posts/${postId}`);
                const data = await res.json();
                const post = data.post;
                setValue('title', post.title);
                setValue('summary', post.summary);

                setTextAreaContent(post.content)

            } catch (err) {
                console.log(err);
                toast("Something went wrong!!!");
            }
        }

        fetchPost();


    }, [postId, setValue]);


    const onSubmit = async (data) => {

        try {
            setIsLoading(true);

            const formData = new FormData();

            const { title, summary, file } = data;

            formData.set('title', title);
            formData.set('summary', summary);
            formData.set('content', textAreaContent);
            formData.set('postId',postId);
            if(file && file[0]){
                formData.set('file', file[0]);
            }
            

            const options = {
                method: "PUT",
                body: formData,
                credentials: 'include'
            }

            const res = await fetch('http://localhost:4000/blog/update', options);

            if (res.ok) {
                toast('Blog Updated successfully!!!');
                navigate(`/post/${postId}`);
            }

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            toast('Failed to create your blog!!!');
            console.log(err);

        }

    }

    return (
        <form className='' onSubmit={handleSubmit(onSubmit)} >
            <h1 className=''>Edit post</h1>
            <Input type='text' placeholder='Enter your title here' register={register} label={'title'} validations={{ required: "Title is required", minLength: 5 }} />
            {errors.title && <p role="alert">{errors.title?.message} {errors.title?.type === 'minLength' && 'Title must have at least 5 chararacters'} </p>}


            <Input type='text' placeholder='Enter your summary here' register={register} label={'summary'} validations={{ required: "Summary is required", minLength: 8 }} />
            {errors.summary && <p role="alert">{errors.summary?.message} {errors.summary?.type === 'minLength' && 'Summary must have at least 8 chararacters'}</p>}

            <Input type='file' register={register} label={'file'}  />
            {errors.file && <p role="alert">{errors.file?.message} </p>}

            <ReactQuillComp value={textAreaContent} onChange={setTextAreaContent} />

            <FormButton disabled={isLoading}>{isLoading ? "Loading...." : 'Update Post'}</FormButton>
        </form>
    )
}

export default EditPost;