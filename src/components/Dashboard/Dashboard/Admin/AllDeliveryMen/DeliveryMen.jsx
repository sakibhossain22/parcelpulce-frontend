/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/AxiosSecure/useAxiosSecure";


const DeliveryMen = ({ item }) => {
    const axiosSecure = useAxiosSecure()
    const [averageRating, setAverageRating] = useState(0)

    useEffect(() => {
        axiosSecure.get(`/average-review?deliveryMenId=${item?._id}`)
        .then(res => {
            setAverageRating(res.data.averageRating)
        })
        .catch(error => {
            console.error(error);
        });
    }, [axiosSecure, item?._id]);
    
    return (
        <tr>
            <td className="font-bold">{item?.name} </td>
            <td className="font-bold">{item?.number || 'Not Exist'}</td>
            <td className="font-bold">{item?.parcelsDelivered || 'No Delivery Data'}</td>
            <td className="font-bold">{averageRating?.toFixed(1) || 0}</td>
        </tr>
    );
};

export default DeliveryMen;