import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import useRoleCheckAPI from "../../Component/hooks/useRoleCheckAPI";
import { AuthContext } from "../../Auth/Provider/AuthProvider";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [roleCheck, roleLoading] = useRoleCheckAPI(); // Check the role from the API
    const location = useLocation();

    // console.log("User Role Data:", roleCheck?.role);

    // If Auth or Role data is loading, display a loading spinner
    if (!authLoading || roleLoading) {
        return (
            <div className="flex items-center justify-center my-10">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                </div>
            </div>
        );
    }

    // If the user exists and their role is "admin", render the children
    if (user && roleCheck?.role == "admin") {
        return children;
    }

    // Otherwise, redirect to the login page
    return <Navigate to="/signIn" state={{ from: location }} replace />;
};

export default AdminRoute;
