/* eslint-disable no-unused-vars */

import useAllDeliveryMen from "../../../../Hooks/useAllDeliveryMen/useAllDeliveryMen";
import DashboardHeader from "../../../DashboardHeader/DashboardHeader";
import DeliveryMen from "./DeliveryMen";
import nodata from '../../../../../assets/nodata.json'
import Lottie from "lottie-react";
import useIsAdmin from "../useAdmin";
import { Helmet } from "react-helmet";
const AllDeliveryMen = () => {
    const {data, refetch} = useAllDeliveryMen()
    if (!data) return <div className="flex items-center justify-center">
    <Lottie animationData={nodata}></Lottie>
</div>
    return (
        <div>
            <Helmet>
                    <title>PARCELPULCE || ALL DELIVERY MAN</title>
                </Helmet>
            <DashboardHeader header='All Delivery Men'></DashboardHeader>
            <div className="my-5">
                <table className="table border-b-2 overflow-x-auto">
                    <thead>
                        <tr className="bg-[#e65c6a] text-white rounded">
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Parcel Delivered</th>
                            <th>Average Rating</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data?.map(item => <DeliveryMen key={item?._id} item={item}></DeliveryMen>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMen;