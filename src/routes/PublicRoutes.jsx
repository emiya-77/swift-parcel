import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layout/Dashboard/Dashboard";
import UserHome from "../pages/DashboardPages/UserPages/UserHome/UserHome";
import BookParcel from "../pages/DashboardPages/UserPages/BookParcel/BookParcel";
import MyParcel from "../pages/DashboardPages/UserPages/MyParcel/MyParcel";
import MyProfile from "../pages/DashboardPages/UserPages/MyProfile/MyProfile";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'user-home',
                element: <UserHome></UserHome>
            },
            {
                path: 'book-parcel',
                element: <BookParcel></BookParcel>
            },
            {
                path: 'my-parcel',
                element: <MyParcel></MyParcel>
            },
            {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            },
        ]
    }
])
