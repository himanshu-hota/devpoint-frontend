import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blogger = ({ bloggerName, postsCount, bloggerId }) => {
    return (
        <Link to={`/bloggers/${bloggerId}`} className='h-full w-full'>
            <div className="blogger bg-card rounded-full w-full h-20 flex justify-between items-center p-4 hover:opacity-95">
                <div className="img h-14 w-14">
                    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="blogger-profile-picture" className="object-cover h-full w-full rounded-full" />

                </div>
                <h1 className="name flex-1 ml-3">{bloggerName}</h1>

                <p className="posts-count p-2 text-md text-white bg-cta rounded-full ">{postsCount }</p>
            </div>
        </Link>
    )
}

Blogger.propTypes = {
    bloggerName: PropTypes.string,
    postsCount: PropTypes.number,
    bloggerId: PropTypes.string
}

export default Blogger;