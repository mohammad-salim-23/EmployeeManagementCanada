import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../Auth/Provider/AuthProvider';

const useCart = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();

    const { data: cart = [], refetch } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart/${user?.email}`)
            return res.data;

        },
        enabled: !!user?.email

    })

    return [cart, refetch];
};

export default useCart;