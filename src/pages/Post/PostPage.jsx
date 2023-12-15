import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { CiEdit } from "react-icons/ci";

import useAuth from '../../hooks/useAuth';
import { getDate } from '../../util/formatTime';



const PostPage = () => {

  const [post, setPost] = useState({});
  const { blogId } = useParams();
  const { user } = useAuth();



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
  const imagePath = 'http://localhost:4000/' + post.cover;

  if (!post) return <p>No Post Found!!!</p>



  return (

    <section className="single-blog w-full h-screen bg-background text-content px-4 py-20 mt-6 overflow-scroll">

      <div className="postImage w-full md:w-1/2 md:mx-auto h-1/2 border-2 border-cta rounded-md p-2 my">
        <img src={imagePath} alt={post.title} className="h-full w-full rounded-md" />
      </div>

      <div className="flex justify-center items-center w-full h-6 gap-5 my-4 md:my-6 md:text-2xl">
        <time className="font-light text-content ">{getDate(new Date(post.createdAt))}</time>
        {
          user?._id === post?.author?._id ? <Link to={`/edit/${post?._id}`} className="text-2xl">
            <CiEdit />
          </Link> : <Link to={`/bloggers/${post?.author?._id}`} className="">by {`${post?.author?.name}`}</Link>
        }
      </div>

      <hr className="w-[80%] md:w-[15%] h-[2px] bg-card mb-4 mx-auto" />


      <h1 className="text-3xl  md:text-5xl w-full text-center break-words font-semibold">
        {post.title}
      </h1> 

      <hr className="w-[80%] md:w-[15%] h-[2px] bg-card my-4 md:my-6 mx-auto" />


      
      {/* <div className="w-full h-max "> */}
      <div dangerouslySetInnerHTML={{ __html: sanitizedSummary }} className="w-full h-max p-2 mb-3 md:px-40 md:text-2xl leading-[3rem] md:leading-[3rem]" />
      {/* </div> */}




{/* 

<div className="w-full h-max ">
        <div dangerouslySetInnerHTML={{ __html: sanitizedSummary }} className="w-[90%] h-[5%] border-2 border-card p-4 rounded-md mx-auto break-words overflow-scroll" />
      </div> */}

    </section>
  )
}

export default PostPage;