import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';

import Header from "../components/Header/Header"
// import './RootLayout.module.css';

const RootLayout = () => {



  return (
    <main>
      <Header />
      <Outlet />

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
    </main>

  )
}

export default RootLayout