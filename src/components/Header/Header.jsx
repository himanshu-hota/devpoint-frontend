import { Link } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";

import useAuth from '../../hooks/useAuth';
import ThemeToggle from '../Theme/ThemeToggle';
import { useTheme } from '../../context/ThemeContext/ThemeContext';
import NavLinks from './NavLinks';

const Header = () => {

  const { isLoggedIn, logout } = useAuth();
  const { isDarkTheme, toggleTheme } = useTheme()

  return (
    <header className={`${isDarkTheme ? 'dark' : 'light'} fixed top-0 left-0 bg-card text-content md:bg-background md:text-content p-2 w-full h-[70px] flex justify-between items-center font-semibold`}>
      <Link to="/" className='text-2xl text-logo'>Dev-Point</Link>
      <div className='w-2/3 h-full flex justify-end'>
        <nav className="hidden md:flex text-lg w-2/3 h-full justify-end items-center gap-6 mr-4  ">
          
          {!isLoggedIn && <NavLinks to="/login" text='Login' />}
          {!isLoggedIn && <NavLinks to="/register" text='Register' />}  

          {isLoggedIn && <NavLinks to="/create" text='Create blog' />}
          {isLoggedIn && <NavLinks to="/profile" text='Profile' />}
          {isLoggedIn && <NavLinks to="/explore" text='Explore' />}
          
          
        </nav>


        <div className='flex items-center gap-4 '>
          <ThemeToggle onClick={() => toggleTheme(!isDarkTheme)} classes='text-2xl text-content' />
          {isLoggedIn && <Link to="/" className="text-3xl text-content" onClick={() => logout()}><TbLogout2 /></Link>}

        </div>
      </div>

    </header>
  )
}

export default Header;