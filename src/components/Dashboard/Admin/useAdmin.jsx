import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";


const useUserType = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useContext(AuthContext)
    const {data : userType, refetch, isLoading : isUserLoading } = useQuery({
        queryKey: ['admin'],
        enabled : !loading && !!user?.email,
        queryFn: async () => {
            const response = await axiosSecure.get(`/user/usertype/${user?.email}`)
            return response.data
        }
    })
    return {userType, isUserLoading, refetch}
};

export default useUserType;