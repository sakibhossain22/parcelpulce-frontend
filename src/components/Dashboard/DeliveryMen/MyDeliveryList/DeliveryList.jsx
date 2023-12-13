/* eslint-disable react/prop-types */

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import MapComponent from "./MapComponent/MapComponent";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const DeliveryList = ({ item, refetch }) => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const deliveryLatitude = item?.latitude;
    const deliveryLongitude = item?.longitude;
    console.log(item.parcelsDelivered);

    const handleStatus = (status) => {
        console.log(status);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update Status"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(status, item._id);
                axiosSecure.patch(`/deliveryCount?email=${user?.email}`)
                .then(res => {
                    console.log(res.data);
                })
                axiosSecure.patch(`/update-status/${item?._id}`, {status : status})
                    .then(res => {
                        // console.log(res.data);
                        if (res.data?.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Status Updated!",
                                text: "Your Status has been Updated.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <tr>
            <td className="font-bold text-[9px]">{item?.name} </td>
            <td className="font-bold text-[10px]">{item?.receiverName}</td>
            <td className="font-bold text-[10px]">{item?.receiverNumber}</td>
            <td className="font-bold text-[10px]">{item?.requestedDeliveryDate}</td>
            <td className="font-bold text-[10px]">{item?.approximateDeliveryDate}</td>
            <td className="font-bold text-[10px]">{item?.receiverNumber}</td>
            <td className="font-bold text-[9px]">{item?.address}</td>
            <td>
                <button onClick={() => document.getElementById('my_modal_3').showModal()} className="text-[10px] bg-green-600 text-white px-1 rounded py-1">Location</button>
            </td>
            <td>
                {
                    item?.status !== 'cancelled' && item?.status !== 'delivered'  ? <button onClick={() => handleStatus('cancelled')} className="text-[10px] bg-red-600 text-white px-1 rounded py-1">Cancel</button> : <button className="text-[10px] bg-gray-600 text-white px-1 disabled rounded py-1">Cancel</button>
                }
            </td>
            <td>
                {
                   item?.status !== 'cancelled' && item?.status !== 'delivered' ? <button onClick={() => handleStatus('delivered')} className="text-[10px] bg-green-600 text-white px-1 rounded py-1">Deliver</button> 
                    :
                    <button className="text-[10px] cursor-pointer bg-gray-600 disabled text-white px-1 rounded py-1">Deliver</button>
                }
            </td>
            <td>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">See Location !</h3>
                        <div>
                            <MapComponent latitude={deliveryLatitude} longitude={deliveryLongitude}></MapComponent>
                        </div>
                    </div>
                </dialog>
            </td>
        </tr>
    );
};

export default DeliveryList;