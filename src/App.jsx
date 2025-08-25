import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AuthLayout from "./Layouts/AuthLayout";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import MainLayout from "./Layouts/MainLayout";
import FeedPage from "./pages/FeedPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFountPage from "./pages/NotFoundPage";
import{QueryClient,QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
// import NotFoundPage from './pages/NotFoundPage';
// import Navbar from './components/Navbar';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import ProtectedAuthRoute from './ProtectedRoutes/ProtectedAuthRoute';

export const queryClient = new QueryClient();
const router=createBrowserRouter([
  {
  path:"",element:<AuthLayout/>,children:[
    {path:"login",element:<ProtectedAuthRoute><LoginPage/></ProtectedAuthRoute>},
    {path:"register",element:<ProtectedAuthRoute><RegisterPage/></ProtectedAuthRoute>},
  
]},
{
    path:"",element:<MainLayout/>,children:[
    {index:true,element:<ProtectedRoute><FeedPage/></ProtectedRoute>},
    {path:'post-details/:id',element:<ProtectedRoute><PostDetailsPage/></ProtectedRoute>},
    {path:"profile",element:<ProfilePage/>},
    {path:"*",element:<NotFountPage/>}

]}
])
function App() {


  return (
    <>
    <QueryClientProvider client={queryClient}>
       <ReactQueryDevtools/>
        <RouterProvider router={router}/>
    </QueryClientProvider>
    

    </>
  )
}

export default App
