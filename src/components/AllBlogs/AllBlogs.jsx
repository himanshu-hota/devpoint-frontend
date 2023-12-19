import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaArrowAltCircleRight } from "react-icons/fa";


const AllBlogs = ({blogId,blog}) => {

    
  return (
      <Link to={`/blog/${blogId}`} className='h-full w-full'>
          <div className="blogger bg-card rounded-full w-full h-20 flex justify-between items-center p-4 my-4 hover:opacity-95 hover:text-cta md:font-semibold">
              <div className="img h-14 w-14 ">
                  <img src={blog?.cover} className="h-full w-full rounded-full" />

              </div>
              <h1 className="name flex-1 ml-3">{blog?.title}</h1>

              <FaArrowAltCircleRight className="text-3xl text-content hover:text-cta " />
          </div>
      </Link>
  )
}

AllBlogs.propTypes = {
    blogId:PropTypes.string,
    blog:PropTypes.object
}

export default AllBlogs;