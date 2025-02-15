
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllPaymentHistory = () => {
    const axiosSecure = useAxiosPublic();

    const { refetch,isLoading, data: paymentHistory = [] } = useQuery({
        queryKey: ['paymentHistory'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/v1/paymentHistory');
            return res.data;
        }
    })
    return [paymentHistory,  isLoading, refetch];

};

export default useAllPaymentHistory;