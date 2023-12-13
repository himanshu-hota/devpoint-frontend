import {Link} from 'react-router-dom';
import styles from './Header.module.css';
import useAuth from '../../hooks/useAuth';

const Header = () => {

    const {isLoggedIn,logout} = useAuth();
    

  return (
      <header className=''>
          <Link to="/" className={styles.logo}>Dev-Point</Link>
          <nav className="">
              {!isLoggedIn && (<>
               <Link to="/login" className="">Login</Link>
               <Link to="/register" className="">Register</Link>
               </>)}
            {
                  isLoggedIn && (
                    <>
                          <Link to="/create" className="">Create New Post</Link>
                          <Link to="/" className=""  onClick={() => logout()}>Logout</Link>
                    </>
                )
            }   
          </nav>
      </header>
  )
}

export default Header;