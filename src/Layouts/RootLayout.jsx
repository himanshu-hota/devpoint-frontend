import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';

import Header from "../components/Header/Header"
import MobileBar from '../components/Header/MobileBar';
import { useTheme } from '../context/ThemeContext/ThemeContext';



const RootLayout = () => {

  const { isDarkTheme } = useTheme();


  return (<>
    <Header />

    <main className={`${isDarkTheme ? 'dark' : 'light'} bg-background text-content w-full h-screen overflow-hidden`}>
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