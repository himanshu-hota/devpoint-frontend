import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import Input from "../../components/Form/Input/Input";
import FormButton from "../../components/Form/FormButton/FormButton";
import ReactQuillComp from "../../components/Form/Quill/ReactQuill";
import { useCreateBlog } from "../../query/react-query";

const CreatePost = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [textAreaContent, setTextAreaContent] = useState('');
  const navigate = useNavigate();
  const { mutate, isPending: isLoading } = useCreateBlog(navigate);
  
  const onSubmit = async (data) => {

    try {
      
      const formData = new FormData();

      const { title, summary, file } = data;

      formData.set('title', title);
      formData.set('summary', summary);
      formData.set('content', textAreaContent);
      formData.set('file', file[0]);

      mutate({formData});
      
    } catch (err) {
      toast('Failed to create your blog!!!');
    }

  }

  return (
     <section className="h-full w-full bg-background text-content px-8 py-20 overflow-scroll ">
      <form className='custom-form px-4 py-8 h-max w-full md:w-[60%] md:mx-auto' onSubmit={handleSubmit(onSubmit)} >
        <h1 className='form-heading'>Create a blog</h1>
        <Input type='text' placeholder='Enter your title here' register={register} label={'title'} validations={{ required: "Title is required", minLength: 5 }} />
        {errors.title && <p role="alert">{errors.title?.message} {errors.title?.type === 'minLength' && 'Title must have at least 5 chararacters'} </p>}


        <Input type='text' placeholder='Enter your summary here' register={register} label={'summary'} validations={{ required: "Summary is required", minLength: 8 }} />
        {errors.summary && <p role="alert">{errors.summary?.message} {errors.summary?.type === 'minLength' && 'Summary must have at least 8 chararacters'}</p>}

        <Input type='file' register={register} label={'file'} validations={{ required: "Blog image is required" }} />
        {errors.file && <p role="alert">{errors.file?.message} </p>}

        
        <ReactQuillComp value={textAreaContent} onChange={setTextAreaContent} />
        
        <FormButton disabled={isLoading}>{isLoading ? "Loading...." : 'Create blog'}</FormButton>
        <p className="text-sm text-content md:hidden">Note : If you are a smartphone user, please switch to desktop mode for better experience</p>
      </form>

     </section>
    
  )
}

export default CreatePost;