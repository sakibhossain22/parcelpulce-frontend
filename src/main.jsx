import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayoyt from './components/MainLayout/MainLayoyt.jsx';
import Home from './components/Home/Home.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import AuthProvider from './components/AuthProvider/AuthProvider.jsx';
import Dashboard from './components/Dashboard/Dashboard/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import BookAParcel from './components/Dashboard/User/BookAParcel/BookAParcel.jsx';
import MyParcel from './components/Dashboard/User/MyParcel/MyParcel.jsx';
import UpdateParcel from './components/Dashboard/User/MyParcel/UpdateParcel.jsx';
import MyProfile from './components/Dashboard/User/MyProfile/MyProfile.jsx';
import Statistics from './components/Dashboard/Dashboard/Admin/Statistics/Statistics.jsx';
import AllParcels from './components/Dashboard/Dashboard/Admin/AllParcels/AllParcels.jsx';
import AllDeliveryMen from './components/Dashboard/Dashboard/Admin/AllDeliveryMen/AllDeliveryMen.jsx';
import AllUser from './components/Dashboard/Dashboard/Admin/AllUser/AllUser.jsx';
import MyReviews from './components/Dashboard/DeliveryMen/MyReviews/MyReviews.jsx';
import MyDeliveryList from './components/Dashboard/DeliveryMen/MyDeliveryList/MyDeliveryList.jsx';
import Payment from './components/Dashboard/Payment/Payment.jsx';
import PaymentSuccess from './components/Dashboard/Payment/PaymentSuccess.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import AdminPrivate from './components/Dashboard/Dashboard/Admin/AdminPrivate/AdminPrivate.jsx';
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoyt></MainLayoyt>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: '/dashboard/update-parcel/:id',
        element: <UpdateParcel></UpdateParcel>,
        loader: ({ params }) => fetch(`https://parcel-pulse-server.vercel.app/book-parcel/update/${params.id}`)
      },
      // Admin
      {
        path: '/dashboard/all-parcels',
        element: <AllParcels></AllParcels>
      },
      {
        path: '/dashboard/all-users',
        element: <AllUser></AllUser>
      },
      {
        path: '/dashboard/all-delivery-men',
        element: <AllDeliveryMen></AllDeliveryMen>
      },
      {
        path: '/dashboard/statistics',
        element: <Statistics></Statistics>
      },
      {
        path: '/dashboard/payment',
        element: <Payment></Payment>
      },

      // user
      {
        path: '/dashboard/my-profile',
        element: <MyProfile></MyProfile>
      },
      {
        path: '/dashboard/book-parcel',
        element: <BookAParcel></BookAParcel>
      },
      {
        path: '/dashboard/my-parcel',
        element: <MyParcel></MyParcel>
      },
      // DeliveryMen
      {
        path: '/dashboard/review-menu',
        element: <MyReviews></MyReviews>
      },
      {
        path: '/dashboard/delivery-list',
        element: <MyDeliveryList></MyDeliveryList>
      },
      {
        path: '/dashboard/payment-success',
        element: <PaymentSuccess></PaymentSuccess>
      }

    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
