/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import lotty from '../../../../../assets/loading.json'
import Lottie from "lottie-react";
import useIsAdmin from "../useAdmin";

const AdminPrivate = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
const [isAdmin, isAdminLoading, refetch] = useIsAdmin()
    const location = useLocation()
    if (loading || isAdminLoading) {
        return <div className="flex items-center justify-center h-screen">
            <Lottie animationData={lotty}></Lottie>
        </div>
    }
    if (user || isAdmin) {
        console.log('user is admin');
        return children
    }
    <Navigate to='/login' state={location.pathname}></Navigate>
    console.log('user is not admin');

};

export default AdminPrivate;