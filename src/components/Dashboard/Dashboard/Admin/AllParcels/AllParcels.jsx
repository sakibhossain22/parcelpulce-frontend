/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import useAllParcel from "../../../../Hooks/useAllParcel/useAllParcel";
import DashboardHeader from "../../../DashboardHeader/DashboardHeader";
import useDeliveryMan from "../../../../Hooks/useDeliveryMan/useDeliveryMan";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import nodata from '../../../../../assets/nodata.json'
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
const AllParcels = () => {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const handleDateRange = (e) => {
        e.preventDefault()
        const date = e.target.value
        const startDate = date.slice(0, 10)
        setStartDate(startDate)
        const endDate = date.slice(11, 22)
        setEndDate(endDate)
    }
    const [allparcel, refetch] = useAllParcel({ startDate, endDate })
    const { data } = useDeliveryMan()

    useEffect(() => {
        if (startDate && endDate) {
            refetch();
        }
    }, [startDate, endDate, refetch]);

    const axiosSecure = useAxiosSecure()
    const [bookedId, setBookedId] = useState('')
    const handleManageClick = (id) => {
        setBookedId(id)
        document.getElementById('my_modal_3').showModal();
    };

    const handleManage = (e) => {
        e.preventDefault();
        const form = e.target;
        const approximateDeliveryDate = form.date.value;
        const deliveryMenId = form.select.value;
        const status = 'on the way';

        axiosSecure.patch(`/manage-booking/${bookedId}`, { approximateDeliveryDate, deliveryMenId, status })
            .then(res => {

                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Delivery Man And Date Added Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // Close the modal after successful assignment
                    const modal = document.getElementById('my_modal_3');
                    if (modal) {
                        modal.close();
                    }
                }
            })
            .catch(error => {
                console.error('Error during assignment:', error);
            });
    };
    if (!data) return <div className="flex items-center justify-center">
        <Lottie animationData={nodata}></Lottie>
    </div>
    return (
        <div>
            <Helmet>
                    <title>PARCELPULCE || ALL PARCEL</title>
                </Helmet>
            <DashboardHeader header='All Booked Parcel'></DashboardHeader>
            <div className="mt-5">
                <div className="my-4">

                    <select onChangeCapture={handleDateRange} defaultValue='default' className="select select-primary w-full max-w-xs">
                        <option disabled value='default'>Select Date Range ?</option>
                        <option value='2023-11-01 2023-11-15'>Nov 1 - 15</option>
                        <option value='2023-11-16 2023-11-31'>Nov 16 - 31</option>
                        <option value='2023-12-01 2023-12-15'>Dec 1 - 15</option>
                        <option value='2023-12-16 2023-12-31'>Dec 16 - 31</option>
                    </select>

                </div>
                <table className="table border-b-2 w-full ">
                    <thead>
                        <tr className="bg-[#e65c6a] text-white rounded">
                            <th>User Name</th>
                            <th>User Phone</th>
                            <th>Booking Date</th>
                            <th>Req Delivery Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allparcel?.map(item => (
                            <tr className="bg-gray-200 border-red-300" key={item._id}>
                                <td className="font-bold">{item?.name}</td>
                                <td className="font-bold">{item?.number}</td>
                                <td className="font-bold">{item?.bookingDate?.slice(0, 10)}</td>
                                <td className="font-bold">{item?.requestedDeliveryDate}</td>
                                <td className="font-bold">{item?.price} $</td>
                                <td className="font-bold">{item?.status}</td>
                                <td>
                                    {item.status == 'pending' ? (
                                        <Link onClick={() => handleManageClick(item._id)} className="font-bold bg-green-600 px-3 py-2 rounded text-white">
                                            Manage
                                        </Link>
                                    ) : (
                                        <span className="disabled bg-gray-200 px-1 py-2 rounded">Manage</span>
                                    )}
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table>
                <div>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <div className="w-full">
                                <form onSubmit={handleManage}>
                                    <p className="my-4 font-bold text-xl">Select Delivery Men ?</p>
                                    <select name="select" defaultValue='default' className="select select-bordered w-full">
                                        <option disabled value='default'>Who shot first?</option>

                                        {
                                            data?.map(man => {

                                                return <option value={man?._id} key={man._id}>{man?.name}</option>
                                            })
                                        }
                                    </select>
                                    <p className="my-4 font-bold text-xl">Select Approximate Delivery Date ?</p>
                                    <input className="border-2 rounded px-5 w-full py-3" type="date" name="date" id="" /><br />

                                    <input className="bg-green-600 text-white px-6 py-2 rounded my-5 w-full cursor-pointer" type="submit" value='Assign' />
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default AllParcels;