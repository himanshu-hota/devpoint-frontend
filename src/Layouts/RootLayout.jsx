import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';

import Header from "../components/Header/Header"
import MobileBar from '../components/Header/MobileBar';
import { useTheme } from '../context/ThemeContext/ThemeContext';
import Loading from '../components/LazyLoader/Loading';
import useAuth from '../hooks/useAuth';



const RootLayout = () => {

  const { isDarkTheme } = useTheme();
  const { userLoading } = useAuth();
  
  if (userLoading) return (
    <main className={`${isDarkTheme ? 'dark' : 'light'} h-screen w-full justify-center items-center`}>
      <Loading />
    </main>
  )

  return (<>
    <Header />

    <main className={`${isDarkTheme ? 'dark' : 'light'} bg-background text-content w-full h-screen overflow-scroll overflow-x-hidden`}>
      <Outlet />
    </main>

    <MobileBar />


    <ToastContainer position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" />
  </>
  )
}

export default RootLayout