import {createBrowserRouter} from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import AdminPanel from "../Pages/Admin/AdminPanel";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import AddProduct from "../Pages/Admin/AddProduct/AddProduct";
import AllProduct from "../Pages/Admin/AllProduct/AllProduct";
import TotalUsers from "../Pages/Admin/TotalUsers/TotalUsers";
// import Dashboard from "../Pages/Admin/Dashboard";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/SignUp',
          element: <SignUp></SignUp>
        },
        {
          path: '/SignIn',
          element: <SignIn></SignIn>
        }
      ]
    },

    {
      path: 'AdminPanel',
      element: <AdminPanel></AdminPanel>,
      children: [
        {
          path: "dashboard",
          element: <Dashboard></Dashboard>
        },
        {
          path: "addProduct",
          element: <AddProduct></AddProduct>
        },
        {
          path: "allProduct",
          element: <AllProduct></AllProduct>
        },
        {
          path: "totalUsers",
          element: <TotalUsers></TotalUsers>
        }
      ]
    }
  ]);