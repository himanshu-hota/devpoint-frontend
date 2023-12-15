import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Post from "../../components/Post/Post";


const Home = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:4000/blogs');
        const fetchedPosts = await res.json();
        setPosts(fetchedPosts.posts);

      } catch (err) {
        toast('Something went wrong!!!');
      }
    }

    fetchPosts();

  }, [])


  return (
    <section className="home px-10 py-20 w-full h-full  bg-background text-content overflow-scroll overflow-x-hidden">
      <h1 className="text-3xl font-semibold">What&apos;s New Today: </h1>
      <hr className="my-4 md:my-8 w-2/3 md:w-1/3 h-0.5 bg-cta" />

      <div className="posts flex flex-col justify-center items-center gap-5">


        {
          posts?.map((post) => {
            return <Post post={post} key={post._id} />
          })
        }
      </div>
    </section>


  )
}

export default Home;