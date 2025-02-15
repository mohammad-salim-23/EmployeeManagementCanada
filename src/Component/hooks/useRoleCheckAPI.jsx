import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../../Auth/Provider/AuthProvider";


const useRoleCheckAPI = () => {

    const { user } = useContext(AuthContext) // Get the current user from context

    const axiosPublic = useAxiosPublic();  
    const { data: roleCheck, error, isPending: roleCheckLoading } = useQuery({
        queryKey: [user?.email, 'roleCheck'],  
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/api/v1/role/${user?.email}`); // Fetch role data based on user email
            // console.log("API Response:", res.data); // Debugging the response
            return res.data;
        },
        enabled: !!user?.email // Only trigger the query if the user email exists
    });

    // Debugging: If there's an error, log it to the console
    if (error) {
        console.error("Role API Error:", error.message);
    }

    // Return the role check data and the loading state
    return [roleCheck, roleCheckLoading]
};

export default useRoleCheckAPI;
