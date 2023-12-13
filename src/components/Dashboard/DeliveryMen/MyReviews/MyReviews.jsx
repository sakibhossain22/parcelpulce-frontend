import useMyReviews from "../../../Hooks/useMyReviews/useMyReviews";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import nodata from '../../../../../src/assets/nodata.json'
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
const MyReviews = () => {
    // eslint-disable-next-line no-unused-vars
    const [data, refetch] = useMyReviews()
    console.log(data);
    if (!data) return <div className="flex items-center justify-center">
    <Lottie animationData={nodata}></Lottie>
</div>
    return (
        <div>
            <Helmet>
                    <title>PARCELPULCE || MY REVIEWS</title>
                </Helmet>
            <div className="mb-4">
                <DashboardHeader header='My Reviews'></DashboardHeader>
            </div>
            <table className="table border-b-2 overflow-x-auto">
                <thead>
                    <tr className="bg-[#e65c6a] text-white rounded">
                        <th>User Photo</th>
                        <th>User Name</th>
                        <th>Rating</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data?.map(item => {

                            return <tr className="border" key={item._id}>
                                <td> 
                                    <img className="w-14 h-14 rounded-full" src={item?.photo} alt="" />
                                </td>
                                <td className="font-bold text-xs">{item?.name}</td>
                                <td className="font-bold text-xs">{item?.rating || 'Not Available'}</td>
                                <td className="font-bold text-xs">{item?.feedback}</td>
                            </tr>
                        })
                    }

                </tbody>

            </table>
        </div>
    );
};

export default MyReviews;