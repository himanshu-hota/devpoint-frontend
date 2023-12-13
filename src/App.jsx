import './App.css';
import RootLayout from './Layouts/RootLayout';
import {
  createBrowserRouter,
  RouterProvider, createRoutesFromElements, Route
} from "react-router-dom";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import CreatePost from './pages/CreatePost/CreatePost';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import PostPage from './pages/Post/PostPage';
import User from './pages/User/User';
import EditPost from './pages/EditPost/EditPost';


const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path="/" element={<RootLayout />}>

      <Route index element={<ProtectedRoutes> <Home /> </ProtectedRoutes>} />
      <Route path='/post/:postId' element={ <PostPage /> } />
      <Route path='/user/:userId' element={ <User /> } />
      <Route path='/edit/:postId' element={<EditPost />} />
      <Route path='/create' element={ <CreatePost /> } />
      <Route path='/login' element={<Login />} />,
      <Route path='/register' element={<Register />} />,

      <Route path='*' element={<ErrorPage />} />,
    </Route>
  )
);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
