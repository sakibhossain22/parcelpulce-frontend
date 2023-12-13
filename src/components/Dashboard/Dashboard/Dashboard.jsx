import { FaArrowUp, FaCalendar, FaHome, FaPaypal, FaShoppingCart, FaUser, FaUserFriends } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useUserType from "../Admin/useAdmin";
import lotty from '../../../assets/loading.json'
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";

const Dashboard = () => {
    const { userType, isUserLoading } = useUserType()

    const isAdmin = userType?.Admin;
    const isUser = userType?.User;
    const isDeliveryMen = userType?.DeliveryMen;


    if (isUserLoading) return <div className="flex items-center justify-center h-screen">
       <Lottie animationData={lotty}></Lottie>
    </div>
    return (
        <div className="max-w-7xl mx-auto overflow-x-hidden">
            <Helmet>
                    <title>PARCELPULCE || DASHBOARD</title>
                </Helmet>
            <div className="grid grid-cols-12 gap-2 h-screen">
                <div className="col-span-3 bg-[#e65c6a]">
                    <div className="mx-10 text-white">
                        <div className="w-full text-center font-bold my-5">
                            <h1 className="text-2xl text-white">PARCEL PULSE</h1>
                        </div>

                        {
                            isAdmin && <>
                                <div className="flex flex-col gap-2">
                                    <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-black" : ""
                                    } to='/dashboard/statistics' >
                                        <div className='flex items-center gap-3'>
                                            <FaArrowUp className="text-2xl"></FaArrowUp>
                                            <span className="text-xl">Statistics</span>
                                        </div>
                                    </NavLink>
                                    <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-black" : ""
                                    } to='/dashboard/all-parcels'>
                                        <div className='flex items-center gap-3'>
                                            <FaShoppingCart className="text-2xl"></FaShoppingCart>
                                            <span className="text-xl">All Parcels</span>
                                        </div>
                                    </NavLink>
                                    <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-black" : ""
                                    } to='/dashboard/all-users' >
                                        <div className='flex items-center gap-3'>
                                            <FaUserFriends className="text-2xl"></FaUserFriends>
                                            <span className="text-xl">All Users</span>
                                        </div>
                                    </NavLink>
                                    <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-black" : ""
                                    } to='/dashboard/all-delivery-men'>
                                        <div className='flex items-center gap-3'>
                                            <FaUser className="text-2xl"></FaUser>
                                            <span className="text-xl">All Delivery Men</span>
                                        </div>
                                    </NavLink>

                                    <div className="divider"></div>
                                    <div className="flex flex-col gap-2">
                                        <NavLink className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-black" : ""
                                        } to='/' >
                                            <div className='flex items-center gap-3'>
                                                <FaHome className="text-2xl"></FaHome>
                                                <span className="text-xl">Home</span>
                                            </div>
                                        </NavLink>
                                        <NavLink className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-black" : ""
                                        } to='/' >
                                            <div className='flex items-center gap-3'>
                                                <FaShoppingCart className="text-2xl"></FaShoppingCart>
                                                <span className="text-xl">Shop</span>
                                            </div>
                                        </NavLink>
                                        <NavLink className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-black" : ""
                                        } to='/our-shop' >
                                            <div className='flex items-center gap-3'>
                                                <FaUserFriends className="text-2xl"></FaUserFriends>
                                                <span className="text-xl">Contact</span>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </>
                        }
                        {/* User */}
                        {
                            isUser && <>
                                <div className="flex flex-col gap-2">
                                    <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-black" : ""
                                    } to='/dashboard/my-profile'>
                                        <div className='flex items-center gap-3'>
                                            <FaPaypal className="text-2xl"></FaPaypal>
                                            <span className="text-xl">My Profile menu</span>
                                        </div>
                                    </NavLink>
                                    <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-black" : ""
                                    } to='/dashboard/book-parcel'>
                                        <div className='flex items-center gap-3'>
                                            <FaHome className="text-2xl"></FaHome>
                                            <span className="text-xl">Book a Parcel</span>
                                        </div>
                                    </NavLink>
                                    <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-black" : ""
                                    } to='/dashboard/my-parcel' >
                                        <div className='flex items-center gap-3'>
                                            <FaCalendar className="text-2xl"></FaCalendar>
                                            <span className="text-xl">My Parcels</span>
                                        </div>
                                    </NavLink>
                                    <div className="divider"></div>
                                    <div className="flex flex-col gap-2">
                                        <NavLink className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-black" : ""
                                        } to='/' >
                                            <div className='flex items-center gap-3'>
                                                <FaHome className="text-2xl"></FaHome>
                                                <span className="text-xl">Home</span>
                                            </div>
                                        </NavLink>
                                        <NavLink className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-black" : ""
                                        } to='/' >
                                            <div className='flex items-center gap-3'>
                                                <FaShoppingCart className="text-2xl"></FaShoppingCart>
                                                <span className="text-xl">Shop</span>
                                            </div>
                                        </NavLink>
                                        <NavLink className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-black" : ""
                                        } to='/our-shop' >
                                            <div className='flex items-center gap-3'>
                                                <FaUserFriends className="text-2xl"></FaUserFriends>
                                                <span className="text-xl">Contact</span>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </>
                        }
                        {/* Delivery Men */}
                        {
                            isDeliveryMen && <>
                                <div className="flex flex-col gap-2">
                                    <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-black" : ""
                                    } to='/dashboard/delivery-list'>
                                        <div className='flex items-center gap-3'>
                                            <FaPaypal className="text-2xl"></FaPaypal>
                                            <span className="text-lg">My Delivery List</span>
                                        </div>
                                    </NavLink>
                                    <NavLink className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-black" : ""
                                    } to='/dashboard/review-menu'>
                                        <div className='flex items-center gap-3'>
                                            <FaHome className="text-2xl"></FaHome>
                                            <span className="text-lg">My Reviews menu</span>
                                        </div>
                                    </NavLink>
                                    <div className="divider"></div>
                                    <div className="flex flex-col gap-2">
                                        <NavLink className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-black" : ""
                                        } to='/' >
                                            <div className='flex items-center gap-3'>
                                                <FaHome className="text-2xl"></FaHome>
                                                <span className="text-xl">Home</span>
                                            </div>
                                        </NavLink>
                                        <NavLink className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-black" : ""
                                        } to='/' >
                                            <div className='flex items-center gap-3'>
                                                <FaShoppingCart className="text-2xl"></FaShoppingCart>
                                                <span className="text-xl">Shop</span>
                                            </div>
                                        </NavLink>
                                        <NavLink className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-black" : ""
                                        } to='/our-shop' >
                                            <div className='flex items-center gap-3'>
                                                <FaUserFriends className="text-2xl"></FaUserFriends>
                                                <span className="text-xl">Contact</span>
                                            </div>
                                        </NavLink>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                </div>
                <div className="col-span-9 bg-[#f6f6f6]">
                    <div className="my-2 ">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;