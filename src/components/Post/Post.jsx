import styles from './Post.module.css';
import PropTypes from 'prop-types';
import {formatTime} from '../../util/formatTime';
import { Link } from 'react-router-dom'

const Post = ({ post }) => {

    const imagePath = 'http://localhost:4000/' + post.cover;
    console.log(imagePath);
    console.log(post);
    return (
        <div className={styles.post}>
            <div className={styles.blogImage}>
                <Link to={`/post/${post._id}`}>
                    <img src={imagePath} alt="blog image" />
                </Link>
            </div>
            <div className={styles.blogTexts}>
                <Link to={`/post/${post._id}`}>
                    <h2 className="">{post.title}</h2>
                </Link>
                <p className={styles.blogInfo}>
                    <Link to={`/user/${post.author._id}`} className={styles.blogAuthor}>{post.author.name}</Link>
                    <time>{formatTime(new Date(post.createdAt))}</time>

                </p>
                <p className={styles.blogSummary}>{post.summary}</p>
            </div>
        </div>

    )
}


Post.propTypes = {
    post: PropTypes.object
}


export default Post;