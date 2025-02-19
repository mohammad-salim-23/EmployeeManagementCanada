import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../../Auth/Provider/AuthProvider";


const useEmployData = () => {

    const { user } = useContext(AuthContext) // Get the current user from context

    const axiosPublic = useAxiosPublic();  
    const { data: employData, error, isPending: employDataLoading ,refetch} = useQuery({
        queryKey: [user?.email, 'employData'],  
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/v1/salaryPay/${user?.email}`); // Fetch role data based on user email
            // console.log("Salary:", res.data); // Debugging the response
            return res.data;
        },
        enabled: !!user?.email // Only trigger the query if the user email exists
    });

    // Debugging: If there's an error, log it to the console
    if (error) {
        console.error("Employ API Error:", error.message);
    }

    // Return the role check data and the loading state
    return [employData,refetch, employDataLoading]
};

export default useEmployData;
