import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Auth/Provider/AuthProvider";
import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";

const usePurchaseHistory = () => {

    const { user } = useContext(AuthContext)

    const axiosPublic = useAxiosPublic();

    const { data: purchaseHistory = [], refetch } = useQuery({
        queryKey: ['purchaseHistory', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/purchaseHistory/${user?.email}`)
            console.log(res.data)
            return res.data;

        },
        enabled: !!user?.email

    })

    return [purchaseHistory, refetch];

};

export default usePurchaseHistory;