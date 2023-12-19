import RootLayout from './Layouts/RootLayout';
import {
  createBrowserRouter,
  RouterProvider, createRoutesFromElements, Route
} from "react-router-dom";


import Lazy from './components/LazyLoader/Lazy';
import { Login, Register, Home, ErrorPage, CreatePost, PostPage, EditPost, Explore, BloggerProfile, Profile, EditProfile, } from './pages';
import Protected from './components/ProtectedRoutes/Protected';



const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path="/" element={<RootLayout />}>

      <Route index element={<Lazy><Home /></Lazy>} />
      <Route path='/login' element={<Login />} />,
      <Route path='/register' element={<Register />} />,
      <Route element={<Protected />}>
        <Route path='/blog/:blogId' element={<Lazy><PostPage /></Lazy>} />
        {/* <Route path='/user/:userId' element={<User />} /> */}
        <Route path='/edit/:postId' element={<EditPost />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/bloggers/:bloggerId' element={<BloggerProfile />} />
        <Route path='/profile' element={<Lazy><Profile /></Lazy>} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/explore' element={<Explore />} />
        
      </Route>

      <Route path='*' element={<ErrorPage />} />,
    </Route>
  )
);

function App() {

  return (
    <RouterProvider router={router} />
  )
}



export default App;
