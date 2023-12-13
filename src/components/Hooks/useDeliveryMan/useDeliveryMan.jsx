import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";

const useDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();

  const { data, refetch } = useQuery({
    queryKey: ["deliveryMan"],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/delivery-man');
        return response.data;
      } catch (error) {
        throw new Error("Error fetching delivery man data");
      }
    },
  });
  return {data, refetch};
};

export default useDeliveryMan;
