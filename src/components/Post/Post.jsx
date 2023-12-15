import PropTypes from 'prop-types';
import { formatTime } from '../../util/formatTime';
import { Link } from 'react-router-dom'

const Post = ({ post }) => {

    const imagePath = 'http://localhost:4000/' + post.cover;

    return (
        <>
        {/* for mobile */}
            <div className='md:hidden post bg-card text-content p-4 flex flex-col gap-4 rounded-md'>
                <div className='blog-image bg-green-600'>
                    <Link to={`/blog/${post._id}`}>
                        <img src={imagePath} alt="blog image" className='object-cover w-full h-full  ' />
                    </Link>
                </div>
                <div className='blog-content glassmorphic-content h-full w-full flex flex-col gap-3 '>
                    <Link to={`/blog/${post._id}`}>
                        <h2 className="text-3xl font-semibold">{post.title}</h2>
                    </Link>
                    <p className='flex gap-2 '>
                        <Link to={`/bloggers/${post.author._id}`} className='text-md'><span className=" ">Author</span> : {post.author.name} -- </Link>

                        <time className='italic'>{formatTime(new Date(post.createdAt))}</time>

                    </p>
                    <p className='hidden md:block'>{post.summary}</p>
                </div>
            </div>

        {/* for Medium and up screens */}
            <div className='hidden md:flex post w-2/3 h-[250px] bg-card text-content p-4  gap-4 rounded-lg'>
                <div className='blog-image w-1/3 h- bg-green-600'>
                    <Link to={`/blog/${post._id}`}>
                        <img src={imagePath} alt="blog image" className='object-cover w-full h-full  ' />
                    </Link>
                </div>
                <div className='blog-content glassmorphic-content h-full w-full flex flex-col gap-3 '>
                    <Link to={`/blog/${post._id}`}>
                        <h2 className="text-3xl font-semibold">{post.title}</h2>
                    </Link>
                    <p className='flex gap-2 '>
                        <Link to={`/bloggers/${post.author._id}`} className='text-md'><span className=" ">Author</span> : {post.author.name} -- </Link>

                        <time className='italic'>{formatTime(new Date(post.createdAt))}</time>

                    </p>
                    <p className='hidden md:block'>{post.summary}</p>
                </div>
            </div>
        </>
    )
}


Post.propTypes = {
    post: PropTypes.object
}


export default Post;