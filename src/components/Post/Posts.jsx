import PropTypes from 'prop-types';
import Post from './Post';

const Posts = ({posts}) => {
  return (
     <>
        {
            posts?.map((post) => {
                return <Post post={post} key={post._id}  />
            })
        }
     </>
  )
}

Posts.propTypes = {
    posts:PropTypes.array
}

export default Posts;
