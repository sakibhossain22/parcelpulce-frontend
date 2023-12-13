/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const BookParcelCount = ({ item , refetch }) => {
    const [count, setCount] = useState(0)
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axiosSecure.get(`/book-parcel-count?email=${item?.email}`)
            .then(res => {
                console.log(res.data);
                setCount(res.data.length)

            })
    }, [axiosSecure, item?.email])
    const updateUser = (role) => {
        console.log(role);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/update-user/${item?._id}`, role)
                    .then(res => {
                        console.log(res.data);
                        if (res?.data?.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Successfully!",
                                text: "User Mofified Successfully",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <tr key={item._id}>
            <td className="font-bold">{item?.name} </td>
            <td className="font-bold">{item?.number || 'Not Exist'}</td>
            <td className="font-bold text-center">{count}</td>
            <td><button onClick={() => updateUser({ role: 'DeliveryMen' })} className="text-white bg-green-600 py-2 rounded px-2">Make Delivery Men</button></td>
            <td><button onClick={() => updateUser({ role: 'Admin' })} className="text-white bg-green-600 py-2 rounded px-2">Make Admin</button></td>
        </tr>
    );
};

export default BookParcelCount;