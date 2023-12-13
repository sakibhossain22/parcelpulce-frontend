import useMyDeliveryList from "../../../Hooks/useMyDeliveryList/useMyDeliveryList";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import DeliveryList from "./DeliveryList";
import nodata from '../../../../../src/assets/nodata.json'
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
const MyDeliveryList = () => {
    const { data, refetch } = useMyDeliveryList()
    if (!data) return <div className="flex items-center justify-center">
    <Lottie animationData={nodata}></Lottie>
</div>
    return (
        <div>
            <Helmet>
                    <title>PARCELPULCE || DELIVERY LIST</title>
                </Helmet>
            <div>
                <div className="mb-4">
                    <DashboardHeader header='My Delivery List'></DashboardHeader>
                </div>
                <table className="table border-b-2 overflow-x-auto">
                    <thead>
                        <tr className="bg-[#e65c6a] text-[10px] text-white rounded">
                            <th>Booked <br />User Name</th>
                            <th>Receiver <br /> Name</th>
                            <th>Booked <br /> User Phone</th>
                            <th>Requested <br /> Delivery Date</th>
                            <th>Approximate <br /> Delivery Date</th>
                            <th>Recievers <br />number</th>
                            <th>Receivers <br /> Address</th>
                            <th>View <br /> Location</th>
                            <th>Cancel</th>
                            <th>Deliver</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data?.map(item => <DeliveryList refetch={refetch} item={item} key={item._id}></DeliveryList>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyDeliveryList;