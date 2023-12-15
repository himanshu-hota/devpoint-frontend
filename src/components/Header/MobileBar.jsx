import { Link } from 'react-router-dom';

import { RiHome4Line } from "react-icons/ri";
import { MdCreateNewFolder } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext/ThemeContext';

const MobileBar = () => {

  const {isLoggedIn} = useAuth();
  const { isDarkTheme } = useTheme();
  if(!isLoggedIn) return;

  return (
    <div className={`${isDarkTheme ? 'dark' : 'light'} mobileBar bg-card text-content md:hidden fixed bottom-0 left-0 h-[70px] w-full flex justify-between items-center px-8 py-8 text-5xl `}>

          <Link to={'/'} className='rounded-full active:scale-95 '><RiHome4Line className='p-2 rounded-full' /></Link>
          <Link to={'/create'} className='rounded-full active:scale-95 '><MdCreateNewFolder className='p-2 rounded-full' /></Link>
          <Link to={'/explore'} className='rounded-full active:scale-95'><FaSearch className='p-2 rounded-full' /></Link>
          <Link to={'/profile'} className='rounded-full active:scale-95 '><IoPersonCircle className='p-2 rounded-full' /></Link>

      </div>
  )
}

export default MobileBar;