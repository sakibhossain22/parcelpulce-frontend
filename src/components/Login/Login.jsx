
import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from 'sweetalert2'
import Lottie from "lottie-react"
import loginAnimation from '../../assets/lotty.json';
import { Helmet } from "react-helmet";
import { FaGoogle } from "react-icons/fa";
import useAxiosSecure from "../Hooks/AxiosSecure/useAxiosSecure";
const Login = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { googleLogin, emailLogin } = useContext(AuthContext)
    const location = useLocation()
    const HandleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const resUser = result.user
                navigate(location.state ? location.state : '/')
                axiosSecure.post(`/user`, { name: resUser?.displayName, email: resUser?.email, role: 'User', image: resUser.photoURL })
                    .then(res => {
                        console.log(res.data);
                    })
            })
            .catch(err => {
                console.error(err.message)
            })
    }

    const handleEmailSign = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value;
        emailLogin(email, password)
            .then(result => {
                const resUser = result.user
                if (resUser) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Login Successful!',
                        confirmButtonText: 'OK'
                    })
                }
                navigate(location.state ? location.state : '/')
            })
            .catch(error => {
                const message = error.message
                Swal.fire({
                    title: 'Error!',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                console.log(error.message);
            })
    }
    return (
        <div>
            <Helmet>
                <title>PARCELPULCE || LOGIN</title>
            </Helmet>
            <div className="h-screen flex items-center justify-center bg-gradient-to-r from-[#ded3d3] to-white">
                <div className="flex relative flex-row-reverse w-full gap-14 items-center justify-center">
                    <div className="border lg:w-2/6 rounded-lg p-8 bg-[#ffcccc]">
                        <form onSubmit={handleEmailSign}>
                            <h1 className="text-center text-black text-3xl font-bold uppercase my-5">Login Now</h1>
                            <div className="h-1 bg-red-600 w-10 mx-auto"></div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Type Your Email"
                                    className="bg-white mt-1 p-2 w-full border rounded focus:outline-none focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Type Your Password"
                                    className="bg-white mt-1 p-2 w-full border rounded focus:outline-none focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <button type="submit" className="w-full py-2 px-4 bg-[#dc3545] text-white rounded hover:bg-[#a66565]">
                                    Login
                                </button>
                            </div>
                            <p className="text-center text-black mb-4">Dont Have An Account? <NavLink className='font-bold px-2 py-1 rounded' to='/register'>Register</NavLink></p>
                        </form>
                        <button onClick={HandleGoogleLogin} className='flex mx-auto items-center bg-[#dc3545] border lg:p-2 p-1 md:p-2 rounded-lg hover:bg-[bg-[#a66565]] transition'>
                            <FaGoogle className="text-white"></FaGoogle>
                            <p className="ml-2 text-white">Google</p>
                        </button>
                    </div>
                    {/* <div className="divider bg-red-600 h-1/2 w-1 top-1/4 absolute"></div> */}
                    <div className="hidden md:block lg:block w-2/6">
                        <Lottie animationData={loginAnimation}></Lottie>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Login;