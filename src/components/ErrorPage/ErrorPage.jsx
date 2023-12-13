import Lottie from "lottie-react";
import error from "../../assets/404.json"
import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <Helmet>
                    <title> 404 </title>
                </Helmet>
                <div className="mx-auto">
                    <Lottie animationData={error}></Lottie>
                </div>
                <div className="flex items-center justify-center">
                    <Link className="bg-green-600 px-6 py-2 rounded text-white mx-auto text-center" to='/'>Home</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;