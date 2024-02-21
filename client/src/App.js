import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from "./pages/Home";
import Footer from "./component/Footer";
import Single from "./pages/Single";
import Write from "./pages/Write";
import './style.scss'
import Manage from "./pages/Manage";
import axios from "axios";

axios.defaults.withCredentials = true;

const Layout = () => {
  return (
    <>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:'/',
        element: <Home/>,
      },
      {
        path:'/post/:id',
        element: <Single/>
      },
      {
        path:'/write',
        element: <Write/>
      },
      {
        path:'/manage',
        element: <Manage/>
      }
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}



export default App;
