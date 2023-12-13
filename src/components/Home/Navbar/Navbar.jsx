/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useUserType from "../../Dashboard/Admin/useAdmin";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const { userType, isUserLoading } = useUserType()

    const isAdmin = userType?.Admin;
    const isUser = userType?.User;
    const isDeliveryMen = userType?.DeliveryMen;
    console.log(isAdmin, isUser, isDeliveryMen);
    const navLinks = <>
        <li><NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "border-b-2 border-green-600" : ""
        } to='/'>Home</NavLink></li>
        <span className={!user?.email && 'hidden'}>
            {
                isUser && <li><NavLink className='hover:border-b-2 border-green-600' to='/dashboard/my-profile'>Dashboard</NavLink></li>
            }
            {
                isDeliveryMen && <li><NavLink className='hover:border-b-2 border-green-600' to='/dashboard/delivery-list'>Dashboard</NavLink></li>
            }
            {
                isAdmin && <li><NavLink className='hover:border-b-2 border-green-600' to='/dashboard/statistics'>Dashboard</NavLink></li>
            }

        </span>
            {
                !user && <li><NavLink className='hover:border-b-2 border-green-600' to='/login'>Login</NavLink></li>
            }
        <li><NavLink className='hover:border-b-2 border-green-600' to='/register'>Register</NavLink></li>
    </>
    return (
        <div>
            <div className="navbar bg-[#dc3545] text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu text-black menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="flex items-center justify-center">
                        <img className="w-20 hidden lg:block" src="https://i.ibb.co/3kt1bJG/LOGO-removebg-preview.png" alt="" />
                        <Link className="font-bold text-xl">PARCEL PULCE</Link>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="px-1 flex gap-3">
                            {navLinks}
                        </ul>
                    </div>
                    {
                        user && <div>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} alt="" />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                                    <h1 className="mx-2 my-2">{user?.displayName}</h1>
                                    <li>
                                        {
                                            isUser && <Link to='/dashboard/my-profile'>Dashboard</Link>
                                        }
                                        {
                                            isDeliveryMen && <Link to='/dashboard/delivery-list'>Dashboard</Link>
                                        }
                                        {
                                            isAdmin && <Link to='/dashboard/statistics'>Dashboard</Link>
                                        }
                                    </li>
                                    <li>
                                        <button onClick={logOut}>Log Out</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;