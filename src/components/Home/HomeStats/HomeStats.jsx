import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaShoppingCart, FaTruck, FaUserFriends } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/AxiosSecure/useAxiosSecure';
const HomeStats = () => {
    const axiosSecure = useAxiosSecure()
    const [data, setData] = useState(null)
    useEffect(() => {
        axiosSecure.get('/home-stats')
            .then(res => {
                console.log(res.data);
                setData(res.data)
            })
    }, [axiosSecure])
    return (
        <div>

            <div className='my-10'>
                <h1 className="font-bold text-3xl my-5 mx-5 border-l-4 border-red-600 px-4">Statistics</h1>
                {/* <div className="bg-[#dc3545] h-1 mb-5 mx-auto w-32"></div> */}
                <div className='mx-5'>
                    <div className=" shadow mx-auto grid lg:gap-5 gap-2 grid-cols-1 lg:grid-cols-3  md:grid-cols-3 text-white">

                        <div className="rounded stat bg-green-400 ">
                            <div className="stat-figure text-red-600">
                                <FaShoppingCart className='text-3xl'></FaShoppingCart>
                            </div>
                            <div className="">Parcel Booked</div>
                            <div className="stat-value"><CountUp end={data?.totalParcel} duration={4} />K</div>

                        </div>

                        <div className="rounded stat bg-green-400">
                            <div className="stat-figure text-red-600">
                                <FaTruck className='text-3xl'></FaTruck>
                            </div>
                            <div className="">Parcel Delivered
                            </div>
                            <div className="stat-value"><CountUp end={data?.totalDelivered} duration={5} />K</div>
                        </div>

                        <div className="rounded stat bg-green-400 ">
                            <div className="stat-figure text-red-600">
                                <FaUserFriends className='text-3xl'></FaUserFriends>
                            </div>
                            <div className="text-white">Users</div>
                            <div className="stat-value"><CountUp end={data?.totalUser} duration={5} />K</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeStats;