import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const useMyDeliveryList = () => {
  const axiosSecure = useAxiosSecure();
const {user} = useContext(AuthContext)
  const { data, refetch } = useQuery({
    queryKey: ["MyDeliveryList"],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(`/my-delivery-list?user=${user?.email}`);
        return response.data;
      } catch (error) {
        throw new Error("Error fetching delivery man data");
      }
    },
  });
  return {data, refetch};
};

export default useMyDeliveryList;
