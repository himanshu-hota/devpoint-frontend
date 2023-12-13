import styles from './ErrorPage.module.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
        <h1>Probbaly you landed on space station</h1>
          <img src="https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&w=600" alt='space-station' />
        <Link to={'/'}>Go to Home</Link>
    </div>
  )
}

export default ErrorPage;