import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';

import useAuth from '../../hooks/useAuth';
import {formatDateString} from '../../util/formatTime';



const PostPage = () => {

  const [post, setPost] = useState({});
  const { postId } = useParams();
  const {user} = useAuth();



  useEffect(() => {

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:4000/posts/${postId}`);
        const data = await res.json();
        setPost(data.post);
      } catch (err) {
        console.log(err);
        toast("Something went wrong!!!");
      }
    }

    fetchPost();


  }, [postId]);


  if(!post) return <p>No Post Found!!!</p>



  // Sanitize the HTML content using DOMPurify
  const sanitizedSummary = DOMPurify.sanitize(post.content);
  const imagePath = 'http://localhost:4000/' + post.cover;

  if (!post) return <p>No Post Found!!!</p>

  return (
    <div>
      <time>{formatDateString(new Date(post.createdAt))}</time>
      <br />
      {
        user?.id === post?.author?._id ? <Link to={`/edit/${post?._id}`}>
          Edit Post
        </Link> : <p className="">by {`${post?.author?.name}`}</p>
      }

      
      <div className="postImage">
        <img src={imagePath} alt={post.title} />
      </div>

      <h1 className="">
        {post.title}
      </h1>

      <div dangerouslySetInnerHTML={{ __html: sanitizedSummary }} />

    </div>
  )
}

export default PostPage;