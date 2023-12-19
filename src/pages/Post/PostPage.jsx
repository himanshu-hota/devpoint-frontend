import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { CiEdit } from "react-icons/ci";

import useAuth from '../../hooks/useAuth';
import { getDate } from '../../util/formatTime';
// import Image from "../../components/Image/Image";
import { MdDelete } from "react-icons/md";
import Portal from "../../components/Portal/Portal";
import Button from "../../components/Form/Button/Button";


const PostPage = () => {

  const [post, setPost] = useState({});
  const { blogId } = useParams();
  const { user } = useAuth();
  const [deletePost, setDeletePost] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:4000/blogs/${blogId}`);
        const data = await res.json();
        setPost(data.post);
      } catch (err) {
        console.log(err);
        toast("Something went wrong!!!");
      }
    }

    fetchPost();


  }, [blogId]);


  if (!post) return <p>No Post Found!!!</p>



  // Sanitize the HTML content using DOMPurify
  const sanitizedSummary = DOMPurify.sanitize(post.content);
  const imagePath = post.cover;

  if (!post) return <p>No Post Found!!!</p>



  const hideDeletePortal = () => {
    setDeletePost(false);
  }

  const showDeletePortal = (e) => {
    e.stopPropagation();
    setDeletePost(true);
  }

  const confirmDelete = async () => {
    setDeletePost(false);
    try {
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials:'include'
      };
      const url = `http://localhost:4000/blog/delete/${blogId}`;
      const res = await fetch(url, options);
      const data = await res.json();

      console.log(data);
      if(res.ok){
        toast('Blog Deleted successfully!!')
        navigate('/');
      }
    } catch (err) {
      toast('Could not delete the blog');
    }
  }



  return (

    <section className="single-blog w-full h-screen bg-background text-content px-4 md:px-20 py-20 mt-6 overflow-scroll" onClick={hideDeletePortal}>

      <div className="postImage w-full md:w-1/2 md:mx-auto h-1/2 border-2 border-cta rounded-md p-2 my">
        <img src={imagePath} alt={post.title} className="h-full w-full rounded-md" />
        {/* <Image imagePath={imagePath} altText={post.title} classes='h-full w-full rounded-md' /> */}
      </div>

      <div className="flex justify-center items-center w-full h-6 gap-5 my-4 md:my-6 md:text-2xl">
        <time className="font-light text-content ">{getDate(new Date(post.createdAt))}</time>
        {
          user?._id?.toString() === post?.author?._id?.toString() ? (
            <div className="btns flex items-center gap-4">
              <Link to={`/edit/${post?._id}`} className="text-2xl">
                <CiEdit />
              </Link>

              <MdDelete className="bg-red-900 p-1 text-3xl text-white rounded-full cursor-pointer" onClick={showDeletePortal} />

            </div>
          ) : <Link to={`/bloggers/${post?.author?._id}`} className="">by {`${post?.author?.name}`}</Link>
        }
      </div>

      <hr className="w-[80%] md:w-[15%] h-[2px] bg-card mb-6 mx-auto" />


      <h1 className="text-sm  md:text-2xl   w-full my-3 break-words ">
        <span className="font-semibold text-content">Title</span> : {post.title}
      </h1>

      <hr className="w-[50%] md:w-[15%] h-[2px] bg-card mb-4 " />
      <p className="text-sm  md:text-2xl   w-full my-3 break-words ">
        <span className="font-semibold text-content">Summary</span> : {post.summary}
      </p>
      <hr className="w-[50%] md:w-[15%] h-[2px] bg-card mb-4 " />

      <p className="text-sm  md:text-2xl   w-full my-3 break-words ">
        <span className="font-semibold text-content">Blog :</span>
      </p>

      
      {/* <div className="w-full h-max "> */}
      <div dangerouslySetInnerHTML={{ __html: sanitizedSummary }} className="blog-content-post w-full h-max px-5 mb-3 md:px-20 md:text-2xl leading-[3rem] list-disc " />
      {/* </div> */}



      {
        deletePost && <Portal>
          <h1 className="text-2xl ">Are you Sure ?</h1>
          <Button clickHandler={confirmDelete} classes={'bg-red-800 w-full h-16 '} >Delete</Button>
          <Button clickHandler={hideDeletePortal} classes={'bg-green-800 w-full h-16 '} >Cancel</Button>
        </Portal>}



      {/* 

        

<div className="w-full h-max ">
        <div dangerouslySetInnerHTML={{ __html: sanitizedSummary }} className="w-[90%] h-[5%] border-2 border-card p-4 rounded-md mx-auto break-words overflow-scroll" />
      </div> */}

    </section>
  )
}

export default PostPage;