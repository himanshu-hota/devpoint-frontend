import { useEffect, useState } from "react";
import {toast} from 'react-toastify';
import Posts from "../../components/Post/Posts";


const Home = () => {
  const [posts, setPosts] = useState([]);
  
  
   useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:4000/posts');
        const fetchedPosts = await res.json();
        setPosts(fetchedPosts.posts);
        
      } catch (err) {
        toast('Something went wrong!!!');
      }
    }

    fetchPosts();
    
  }, [])
  

  return (
    <Posts posts={posts} />
    
  )
}

export default Home;