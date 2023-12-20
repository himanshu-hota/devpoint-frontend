import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const tempImage = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';

const Blogger = ({ bloggerName, postsCount, bloggerId, profilePicture }) => {

    const imagePath =  profilePicture;
    const {user} = useAuth()

    if(user?._id?.toString() === bloggerId){
        return <></>;
    }else{

    return (
        <Link to={`/bloggers/${bloggerId}`} className='h-full w-full'>
            <div className="blogger bg-card rounded-full w-full h-20 flex justify-between items-center p-4 hover:opacity-95">
                <div className="img h-14 w-14">
                    <img src={imagePath || tempImage} alt="blogger-profile-picture" className="object-cover h-full w-full rounded-full" />

                </div>
                <h1 className="name flex-1 ml-3">{bloggerName}</h1>

                <p className="posts-count px-5 md:px-6 text-md text-white bg-cta rounded-full ">{postsCount }</p>
            </div>
        </Link>
    )

    }
}

Blogger.propTypes = {
    bloggerName: PropTypes.string,
    postsCount: PropTypes.number,
    bloggerId: PropTypes.string,
    profilePicture:PropTypes.string
}

export default Blogger;