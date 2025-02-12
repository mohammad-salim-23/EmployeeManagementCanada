import { useContext, useEffect, useState } from "react";
import { FaBarsStaggered, } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";
import {   MdOutlineDashboardCustomize, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Auth/Provider/AuthProvider";
import { FcPlus } from "react-icons/fc";


const AdminPanel = () => {

    const navigation = useNavigate();
    const { user, logOut } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    // mobile View toggle
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handel Logout
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Logout Success!",
                    text: "Logout !",
                    icon: "success"
                });
                navigation('/')
            })
            .catch(error => console.log(error))

    }


    // Date & Time
    const [time, setTime] = useState("");

    // Function to update the time
    const updateTime = () => {
        const currentDate = new Date();

        // Format options for 12-hour time with AM/PM and date as DD/MM/YYYY
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true, // 12-hour clock format with AM/PM
            day: '2-digit', // Day as 2 digits
            month: '2-digit', // Month as 2 digits
            year: 'numeric', // Full year
            timeZone: 'Asia/Dhaka', // Bangladesh time zone (BST)
        };

        // Get the formatted date and time
        const bangladeshTime = currentDate.toLocaleString('en-US', options);

        // Format the output to match the desired pattern
        const formattedDateTime = `${bangladeshTime.slice(11)}, ${bangladeshTime.slice(0, 10)}`;

        setTime(formattedDateTime);
    };

    // Update time every second
    useEffect(() => {
        const interval = setInterval(updateTime, 1000);
        updateTime();  

        return () => clearInterval(interval);
    }, []);



    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } fixed inset-y-0 left-0 z-30 w-64 bg-blue-800 transform md:translate-x-0 transition-transform duration-300 ease-in-out md:flex md:relative md:flex-col`}
            >
                {/* Logo  */}
                <div className="flex items-center justify-center h-20 bg-pink-700">
                    <Link to={"/"}>
                        <span className="text-white font-bold uppercase p-4 ">Employee Management</span>
                    </Link>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto">

                    <nav className="flex-1 px-2 py-4 bg-[#8C60EB]">
                        {/* Dashboard */}
                        <Link to={"/adminPanel/dashboard"} className="flex items-center px-4 py-4 space-y-4 rounded-lg text-gray-100 hover:bg-blue-800">
                            <MdOutlineDashboardCustomize className="h-6 w-6 mr-2" />
                            Dashboard
                        </Link>
                        {/* Add Product */}
                        <Link to={"/adminPanel/addProduct"} className="flex items-center px-4 py-4 space-y-4 rounded-lg text-gray-100 hover:bg-blue-800">
                            <FcPlus className="h-6 w-6 mr-2"/>
                            Add Product
                        </Link>
                        {/* All Product */}
                        <Link to={"/adminPanel/allProduct"} className="flex items-center px-4 py-4 space-y-4 rounded-lg text-gray-100 hover:bg-blue-800">
                            <MdOutlineProductionQuantityLimits className="h-6 w-6 mr-2"/>
                            All Product
                        </Link>

                        {/* Total Users */}
                        <Link to={"/adminPanel/totalUsers"} className="flex items-center px-4 py-4 space-y-4 rounded-lg text-gray-100 hover:bg-blue-800">
                            <HiUserGroup className="h-6 w-6 mr-2" />
                            Total Users
                        </Link>
 
                    </nav>
                </div>

            </div>


            {/*  mobile view */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-25 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-y-auto">

                <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">


                    <p className="font-bold">{time}</p>

                    <div className="flex flex-col items-center justify-center">
                        {/* User Profile */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative inline-block text-left hover:cursor-pointer">
                                <div className="group">
                                    <div className="inline-flex justify-center items-center mx-auto w-14 h-14 relative border-4 border-white rounded-full overflow-hidden">
                                        <img
                                            className="object-cover object-center h-full w-full"
                                            src={user?.photoURL || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"}
                                            alt="No Photo"
                                        />
                                    </div>

                                    <div
                                        className="absolute left-full -translate-x-full top-0 w-40 mt-14 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                                        <div className="py-1">
                                            <Link to={"/"} className="block px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring">Home</Link>
                                            <Link onClick={handleLogOut} className="block px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring mt-2">LogOut</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Dashboard5d Drawer Button */}
                    <button
                        className={`text-gray-500 focus:outline-none focus:text-gray-700 md:hidden ${isSidebarOpen ? 'order-last' : ''
                            }`}
                        onClick={toggleSidebar}
                    >
                        {isSidebarOpen ? (

                            <ImCancelCircle className="text-3xl" />

                        ) : (

                            <FaBarsStaggered className="text-3xl" />
                        )}
                    </button>
                </div>


                {/* Content */}
                <div className="p-4">
                    <Outlet></Outlet>

                </div>
            </div>
        </div>
    )
}
export default AdminPanel;