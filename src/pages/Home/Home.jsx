// import { toast } from 'react-toastify';
import Post from "../../components/Post/Post";
import { useGetBlogs } from "../../query/react-query";
import Loading from "../../components/LazyLoader/Loading";
import Error from "../ErrorPage/Error";

const Home = () => {

  const { data, isPending: isfetchingBlogs, isError: failedToFetchBlogs, error: blogsError } = useGetBlogs();

  if (failedToFetchBlogs) return <Error title='Could Not fetch blogs' message={blogsError.message} />

  return (
    <section className="home px-10  w-full h-full bg-background text-content ">
      <h1 className="text-3xl font-semibold">What&apos;s New Today: </h1>
      <hr className="my-4 md:my-8 w-2/3 md:w-1/3 h-0.5 bg-cta" />

      {isfetchingBlogs && <Loading />}
      {failedToFetchBlogs && <Error title='Could Not fetch blogs' message={blogsError.message} />}

      {data &&
          <div className="posts flex flex-col justify-center items-center gap-5">

            {
            data.blogs.map((post) => {
                return <Post post={post} key={post._id} />
              })
            }
          </div>

    }
      
    </section >


  )
}

export default Home;