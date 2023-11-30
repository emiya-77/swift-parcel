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
import AdminStatistics from "../pages/DashboardPages/AdminPages/AdminStatistics/AdminStatistics";
import AdminParcel from "../pages/DashboardPages/AdminPages/AdminParcel/AdminParcel";
import AdminUsers from "../pages/DashboardPages/AdminPages/AdminUsers/AdminUsers";
import AdminDeliveryMen from "../pages/DashboardPages/AdminPages/AdminDeliveryMen/AdminDeliveryMen";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
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
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'user-home',
                element: <PrivateRoute><UserHome></UserHome></PrivateRoute>
            },
            {
                path: 'book-parcel',
                element: <PrivateRoute><BookParcel></BookParcel></PrivateRoute>
            },
            {
                path: 'my-parcel',
                element: <PrivateRoute><MyParcel></MyParcel></PrivateRoute>
            },
            {
                path: 'my-profile',
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },

            // admin routes
            {
                path: 'statistics',
                element: <PrivateRoute><AdminStatistics></AdminStatistics></PrivateRoute>
            },
            {
                path: 'all-parcel',
                element: <PrivateRoute><AdminParcel></AdminParcel></PrivateRoute>
            },
            {
                path: 'all-user',
                element: <PrivateRoute><AdminUsers></AdminUsers></PrivateRoute>
            },
            {
                path: 'all-delivery',
                element: <PrivateRoute><AdminDeliveryMen></AdminDeliveryMen></PrivateRoute>
            },

            // delivery routes
            {
                path: 'my-delivery-list',
                element: <PrivateRoute><AdminUsers></AdminUsers></PrivateRoute>
            },
            {
                path: 'my-reviews',
                element: <PrivateRoute><AdminDeliveryMen></AdminDeliveryMen></PrivateRoute>
            },
        ]
    }
])
