import { useState } from 'react';
import useAllUser from '../../../../Hooks/useAllUser/useAllUser';
import DashboardHeader from '../../../DashboardHeader/DashboardHeader';
import BookParcelCount from './BookParcelCount';
import nodata from '../../../../../assets/nodata.json'
import Lottie from "lottie-react";
import { Helmet } from 'react-helmet';
const ITEMS_PER_PAGE = 5;

const AllUser = () => {
    const { data, refetch } = useAllUser();
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    if (!data) return <div className="flex items-center justify-center">
        <Lottie animationData={nodata}></Lottie>
    </div>
    return (
        <div>
            <Helmet>
                    <title>PARCELPULCE || ALL USER</title>
                </Helmet>
            <DashboardHeader header="All User"></DashboardHeader>
            <div className="my-5">
                <table className="table border-b-2 overflow-x-auto">
                    <thead>
                        <tr className="bg-[#e65c6a] text-white rounded">
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th> Parcel Booked</th>
                            <th>Make Delivery Men</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map((item) => (
                            <BookParcelCount refetch={refetch} key={item._id} item={item}></BookParcelCount>
                        ))}
                    </tbody>
                </table>
                <div className="divider"></div>
                <div className="flex justify-center mt-4">
                    <nav>
                        <ul className="pagination flex gap-5 items-center justify-center">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button onClick={() => handlePageChange(index + 1)}
                                    key={index + 1}
                                    className={`page-item ${currentPage === index + 1 ? 'bg-[#dc3545] rounded text-white  w-10 px-4 py-2' : 'px-4 py-2 bg-gray-200 rounded'}`}
                                >
                                    <button
                                        className="page-link"

                                    >
                                        {index + 1}
                                    </button>
                                </button>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AllUser;
