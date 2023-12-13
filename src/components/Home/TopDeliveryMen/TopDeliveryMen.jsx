import useDeliveryMan from "../../Hooks/useDeliveryMan/useDeliveryMan";

import DeliveryMan from "./DeliveryMan";
const TopDeliveryMen = () => {
    const { data } = useDeliveryMan()

    return (
        <div className="my-10">
            <h1 className="font-bold text-3xl my-5 mx-5 border-l-4 border-red-600 px-4">Top Delivery Man</h1>
            <div className="mx-5">
                <div className="grid lg:gap-10 gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                    {
                        data?.slice(0,6).map(man => <DeliveryMan key={man?._id} man={man}></DeliveryMan>)
                    }
                </div>
            </div>
        </div>
    );
};

export default TopDeliveryMen;