import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";

const useIsAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useContext(AuthContext)
    const {data : isAdmin, refetch, isLoading : isAdminLoading } = useQuery({
        queryKey: ['admin'],
        enabled : !loading && !!user?.email,
        queryFn: async () => {
            const response = await axiosSecure.get(`/user/admin/${user?.email}`)
            return response.data
        }
    })
    return [isAdmin, isAdminLoading, refetch]
};

export default useIsAdmin;