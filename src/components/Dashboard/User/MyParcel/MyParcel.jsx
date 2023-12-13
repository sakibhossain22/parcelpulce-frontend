import { FaTrashAlt } from "react-icons/fa";
import useParcel from "../../../Hooks/useParcel/useParcel";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import nodata from '../../../../../src/assets/nodata.json'
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";


const MyParcel = () => {
    const { user } = useContext(AuthContext)
    const [data, refetch] = useParcel()

    const [filter, setFilter] = useState(data)
    const [deliveryMenId, setDeliveryMenId] = useState(null)
    console.log(deliveryMenId);
    const axiosSecure = useAxiosSecure()
    const handleDelete = (id) => {
        const cancelled = { status: 'cancelled' }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/update-status/${id}`, cancelled)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Booking Cancelled!",
                                text: "Your Booking has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    const handleStatus = (e) => {
        const status = { status: e.target?.value }
        console.log(status.status);
        axiosSecure.get(`/sort-status?status=${status.status}&email=${user?.email}`)
            .then(res => {
                console.log(res.data);
                setFilter(res?.data)

            })
    }
    useEffect(() => {
        setFilter(data)
    }, [data])

    const handleManageClick = (parcel) => {
        setDeliveryMenId(parcel?.deliveryMenId)
        // console.log('Manage link clicked with item data:', parcel);
        document.getElementById('my_modal_3').showModal();
    };
    const handleFeedBack = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const photo = form.photo.value
        const rating = form.rating.value
        const feedback = form.feedback.value
        const deliveryMenId = form.id.value
        const feedBackInfo = { name, photo, rating, feedback, deliveryMenId }
        console.log(feedBackInfo);

        axiosSecure.post(`/add-reviews`, feedBackInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Feedback Added Successfully !",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    const modal = document.getElementById('my_modal_3');
                    if (modal) {
                        modal.close();
                    }
                }
            })
    }





    if (!data) return <div className="flex items-center justify-center">
        <Lottie animationData={nodata}></Lottie>
    </div>


    return (
        <div>
            <Helmet>
                <title>PARCELPULCE || MY PARCEL</title>
            </Helmet>
            <div className="my-4">
                <select defaultValue='default' onChange={handleStatus} className="select select-primary w-full max-w-xs">
                    <option disabled value='default'>Select The Statue</option>
                    <option>pending</option>
                    <option>cancelled</option>
                    <option>on the way</option>
                    <option>delivered</option>
                </select>
            </div>
            <table className="table border-b-2 overflow-x-auto">
                <thead>
                    <tr className="bg-[#e65c6a] text-white rounded">
                        <th>Type</th>
                        <th>Req Deli Date</th>
                        <th>App Deli Date</th>
                        <th>Booking Date</th>
                        <th>Del Men ID</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Cancel</th>
                        <th>Pay</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        filter?.map(item => {

                            return <tr key={item._id}>
                                <td className="font-bold text-xs">{item?.type} </td>
                                <td className="font-bold text-xs">{item?.requestedDeliveryDate}</td>
                                <td className="font-bold text-xs">{item?.approximateDeliveryDate || 'not assigned'}</td>
                                <td className="font-bold text-xs">{item?.bookingDate?.slice(0, 10)}</td>
                                <td className="font-bold text-xs">
                                    <span>{item?.deliveryMenId?.slice(0, 10) || 'not assigned'}</span><br />
                                    <span>{item?.deliveryMenId?.slice(10, 20)}</span>
                                </td>
                                <td className="font-bold text-xs">{item?.status}</td>
                                <td className="text-xs">
                                    {item.status == 'pending' ? (
                                        <Link className="bg-green-600 px-1 py-2 rounded text-white" to={`/dashboard/update-parcel/${item._id}`}>
                                            Update
                                        </Link>
                                    ) : (
                                        <span className="disabled bg-gray-200 px-1 py-2 rounded">Update</span>
                                    )}
                                </td>
                                <td className="text-xs">
                                    {
                                        item.status === 'pending' && <button onClick={() => handleDelete(item._id)} className="bg-[#B91C1C] px-4 rounded py-2">
                                            <FaTrashAlt className="text-lg text-white"></FaTrashAlt>
                                        </button>
                                    }
                                    {
                                        item.status === 'delivered' && <button onClick={() => handleManageClick(item)} className="bg-[#B91C1C] px-4 rounded py-2 text-white">
                                            Review
                                        </button>
                                    }
                                    {
                                        item.status === 'cancelled' && <button>
                                            Cancelled
                                        </button>
                                    }
                                    {
                                        item?.status !== 'pending' && item?.status !== 'cancelled' && item?.status !== 'delivered' && <button className="disabled text-white bg-gray-400 px-2 py-2">
                                            <FaTrashAlt></FaTrashAlt>
                                        </button>
                                    }
                                </td>
                                <td className="text-xs">

                                    {
                                        item?.status !== 'cancelled' ? <Link state={{ price: item?.price }} to='/dashboard/payment'><button className="bg-green-600 text-white px-3 py-2">Pay</button></Link> : <button className="bg-gray-200 disabled text-black px-3 py-2">Pay</button>
                                    }
                                </td>
                                <div>
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <div className="w-full">
                                                <form onSubmit={handleFeedBack}>
                                                    <p className="my-2 font-bold text-lg">User Name</p>
                                                    <input disabled defaultValue={user?.displayName} className="border-2 rounded px-5 w-full py-2" type="text" name="name" id="" /><br />
                                                    <p className="my-4 font-bold text-xl">User Image</p>
                                                    <input disabled defaultValue={user?.photoURL} className="border-2 rounded px-5 w-full py-2" type="text" name="photo" id="" /><br />

                                                    <p className="my-2 font-bold text-lg">Give Ratings ?</p>
                                                    <select name="rating" defaultValue='default' className="select select-bordered w-full">
                                                        <option disabled value='default'>Give Ratings Out of 5</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                    <p className="my-2 font-bold text-lg">DeliveryMen Id</p>
                                                    <input disabled defaultValue={deliveryMenId} className="border-2 rounded px-5 w-full py-2" type="text" name="id" id="" /><br />

                                                    <p className="my-2 font-bold text-lg">Feedback</p>
                                                    <textarea name="feedback" className="w-full border-2 rounded" id="" cols="30" rows="3"></textarea><br />
                                                    <input className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded my-5 w-full" type="submit" value='Assign' />
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            </tr>
                        })
                    }

                </tbody>

            </table>
        </div>
    );
};

export default MyParcel;
