import { useParams } from "react-router-dom";
import { formatDateString } from '../../util/formatTime';
import AllBlogs from "../../components/AllBlogs/AllBlogs";
import { useGetBlogger } from "../../query/react-query";
import Loading from "../../components/LazyLoader/Loading";
import Error from "../ErrorPage/Error";
import { useEffect, useState } from "react";

const tempImage = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';

const BloggerProfile = () => {
    const [loaded, setLoaded] = useState(false);
    const { bloggerId } = useParams();
    const { data, isPending, isError, error } = useGetBlogger(bloggerId);

    useEffect(() => {

        const timeoutId = setTimeout(() => {
            setLoaded(true);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, []);


    if (!loaded) return <Loading />

    if (isError) return <Error message={error.message} />

    return (
        <section className="blogger-profile bg-background text-content h-full w-full md:mt-6 py-20 md:flex md:gap-6 md:px-12 overflow-x-hidden overflow-scroll">

            {/* <div className="profile-info w-full md:w-[50%] h-[50%] md:h-full md:border-2 md:border-cta md:rounded-md flex justify-between items-center md:flex-col p-4 ">
                <div className="img h-full md:h-1/3 w-1/2 md:w-full p-3">
                    <img src={imagePath || tempImage} alt='h-full w-full md:w-1/2 object-cover border-2 border-cta p-2 rounded-lg md:mx-auto' />
                </div>

                <div className="info h-full w-1/2 md:w-full px-2 md:px-8 py-6 flex flex-col gap-3">
                    <h1 className="name"><span className="font-semibold">Name : </span>{name}</h1>
                    <p className="member-since"><span className="font-semibold">Member since : </span>{formatDateString(new Date(createdAt))}</p>
                    <p className="member-since"><span className="font-semibold">Total blogs : </span>{totalBlogs}</p>
                </div>
            </div> */}


            <div className="profile-info w-full md:w-[50%] h-[60%] md:h-full md:border-2 md:border-cta md:rounded-md flex justify-between items-center md:flex-col p-4 ">

                {isPending && <Loading />}

                {data?.blogger && <>
                    <div className="img h-full md:h-1/3 w-1/2 md:w-full p-3">
                        <img src={data.blogger.profilePicture || tempImage} alt='blogger-image' className='h-full w-full md:w-1/2 object-cover border-2 border-cta p-2 rounded-lg md:mx-auto' />
                    </div>

                    <div className="info h-full w-1/2 md:w-full px-2 md:px-8 py-6 flex flex-col gap-1">
                        <h1 className="name"><span className="font-semibold">Name : </span>{data.blogger.name}</h1>
                        <hr className="h-0.5 w-full bg-content m-0 p-0 hidden md:block" />
                        <p className="member-since"><span className="font-semibold">Member since : </span>{formatDateString(new Date(data.blogger.createdAt))}</p>
                        <hr className="h-0.5 w-full bg-content m-0 p-0 hidden md:block" />
                        <p className="member-since"><span className="font-semibold">Total blogs : </span>{data.blogger.totalBlogs}</p>
                        <hr className="h-0.5 w-full bg-content m-0 p-0 hidden md:block" />

                    </div>
                </>}
            </div>

            <hr className="h-0.5 w-[80%] bg-cta mx-auto md:hidden" />

            <div className="blogs w-full h-[50%] md:h-full p-4 md:border-2 border-cta md:rounded-md overflow-hidden">

                {isPending && <Loading />}
                {data?.blogger && <>
                    <h1 className="text-xl my-2 pl-2 mb-5">Blogs : </h1>
                    <hr className="hidden md:block h-0.5 w-[15%] bg-cta " />
                    <div className="all-blogs border-2 border-cta md:border-0 p-4 rounded-md h-full w-full overflow-scroll overflow-x-hidden">
                        {
                            data.blogger.blogPosts?.map(item => (
                                <AllBlogs key={item.postId._id} blog={item.postId} blogId={item.postId._id} />
                            ))
                        }
                    </div>
                </>}
            </div>

        </section>
    )
}

export default BloggerProfile;