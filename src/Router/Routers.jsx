import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import AdminPanel from "../Pages/Admin/AdminPanel";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import AddProduct from "../Pages/Admin/AddProduct/AddProduct";
import AllProduct from "../Pages/Admin/AllProduct/AllProduct";
import TotalUsers from "../Pages/Admin/TotalUsers/TotalUsers";
import FirstPayment from "../Pages/Admin/FirstPayment/FirstPayment";
import PaymentHistory from "../Pages/Admin/PaymentHistory/PaymentHistory";
import SalaryPay from "../Pages/Admin/SalaryPay/SalaryPay";
import AdminRoute from "./AdminRoute/AdminRoute";

import Profile from "../Pages/Profile/Profile";
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
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ]
  },

    

    {
      path: 'AdminPanel',
      element: <AdminPanel><AdminPanel></AdminPanel></AdminPanel>,
      children: [
        {
          path: "dashboard",
          element:  <AdminRoute><Dashboard></Dashboard> </AdminRoute>
        },
        {
          path: "addProduct",
          element: <AdminRoute><AddProduct></AddProduct></AdminRoute>
        },
        {
          path: "allProduct",
          element: <AdminRoute><AllProduct></AllProduct></AdminRoute>
        },
        {
          path: "totalUsers",
          element: <AdminRoute> <TotalUsers></TotalUsers></AdminRoute>
        },
        {
          path: "firstPayment",
          element: <AdminRoute><FirstPayment></FirstPayment></AdminRoute>
        },
        {
          path: "paymentHistory",
          element: <AdminRoute><PaymentHistory></PaymentHistory></AdminRoute>
        },
        {
          path: "salaryPay",
          element: <AdminRoute><SalaryPay></SalaryPay></AdminRoute>
        }
      ]
    }
  ]);
