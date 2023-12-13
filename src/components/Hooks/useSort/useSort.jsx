import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const useSort = () => {
    const {status, setStatus} = useContext(AuthContext)
    console.log(status);
  const axiosSecure = useAxiosSecure();
  const { data, refetch } = useQuery({
    queryKey: ["parcel-sort"],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(`/sort-status?status=${status.status}`);
        setStatus(response.data)
        return response.data;
        
      } catch (error) {
        throw new Error("Error fetching delivery man data");
      }
    },
  });
  console.log(data);
  return [data, refetch];
};

export default useSort;
