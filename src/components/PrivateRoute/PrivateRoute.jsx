/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Lottie from "lottie-react";
import lotty from '../../assets/loading.json'


const PrivateRoute = ({ children }) => {
    const location = useLocation()
    console.log(location);
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <div className="flex items-center justify-center h-screen">
        <Lottie animationData={lotty}></Lottie>
    </div>
    }
    if (user) {
        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;