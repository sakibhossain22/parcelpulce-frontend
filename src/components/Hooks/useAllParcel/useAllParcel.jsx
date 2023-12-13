import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";

const useAllParcel = ({ startDate, endDate }) => {

    const axiosSecure = useAxiosSecure();
    const { data: allparcel, refetch } = useQuery({
        queryKey: ["all-parcel"],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/all-parcel?startDate=${startDate}&endDate=${endDate}`);
                console.log(response.data);
                return response.data;
            } catch (error) {
                throw new Error("Error fetching delivery man data");
            }
        },
    });
    console.log(allparcel);
    return [allparcel, refetch];
};

export default useAllParcel;