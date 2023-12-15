import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import {formatDateString} from '../../util/formatTime';
import AllBlogs from "../../components/AllBlogs/AllBlogs";

const tempImage = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const BloggerProfile = () => {

    const [bloggerInfo, setBloggerInfo] = useState({});

    const {bloggerId} = useParams();

    useEffect(() => {
      
        const fetchBloggerInfo = async () => {
            try {
                const res = await fetch(`http://localhost:4000/user/bloggers/${bloggerId}`);
                const user = await res.json();
                setBloggerInfo(user.user);
            } catch (err) {
                console.log(err);
            }
        }

        fetchBloggerInfo();

    }, [bloggerId]);
    
    

    const {name,createdAt,totalBlogs,blogPosts,profilePicture} = bloggerInfo;
    const imagePath = 'http://localhost:4000/' + profilePicture;


    return (
        <section className="blogger-profile bg-background text-content h-full w-full py-20">

            <div className="profile-info w-full h-[50%] flex justify-between items-center p-4 ">
                <div className="img h-full w-1/2 p-3">
                    <img src={imagePath || tempImage} alt='blogger-image' className='h-full w-full object-cover border-2 border-cta p-2 rounded-lg' />
                </div>

                <div className="info h-full w-1/2 px-2 py-6  flex flex-col gap-3">
                    <h1 className="name"><span className="font-semibold">Name : </span>{name}</h1>
                    <p className="member-since"><span className="font-semibold">Member since : </span>{formatDateString(new Date(createdAt))}</p>
                    <p className="member-since"><span className="font-semibold">Total blogs : </span>{totalBlogs}</p>
                </div>
            </div>

            <div className="h-0.5 w-[80%] bg-cta mx-auto my-4"></div>

            <div className="blogs w-full h-full  p-4">
                <h1 className="text-2xl font-semibold my-2 pl-2 mb-5">Blogs : </h1>
                
                <div className="all-blogs w-full h-full border-2 border-cta p-4 overflow-scroll overflow-x-hidden">
                    {
                        blogPosts?.map(item => (
                            <AllBlogs key={item.postId._id} blog={item.postId} blogId={item.postId._id} />
                        ))
                    }
                </div>
            </div>

        </section>
    )
}

export default BloggerProfile;