import { useContext, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your are successfully logout",
            showConfirmButton: false,
            timer: 1500
        });
    }

    return (
        <div className="">
            <div className="text-center mb-5">
                <nav className="bg-[#2C3E50] text-white px-4 py-5 flex items-center justify-between">
                    <div className="text-2xl font-bold">
                        <Link to={'/'}>
                            Logo
                        </Link>
                    </div>

                    <div className="flex-1 mx-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full max-w-md px-4 py-2 rounded-full text-gray-800 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <CgShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-2 -right-2 bg-green-500 text-xs text-white rounded-full px-1">
                                0
                            </span>
                        </div>

                        {
                            user ? <>
                                <div className="relative z-50">
                                    <button onClick={() => setOpen(!open)} className="flex items-center space-x-2">
                                        <img
                                            src={user?.photoURL}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full border-2 border-gray-300"
                                        />
                                    </button>

                                    {open && (
                                        <div className="absolute right-0 mt-2 px-2 w-40 bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-100 visible transition duration-300">
                                            <div className="py-1">
                                                <Link
                                                    to="/profile"
                                                    className="block px-6 py-2 text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
                                                >
                                                    Profile
                                                </Link>
                                                <button
                                                    onClick={() => handleLogOut()}
                                                    className="block px-6 py-2 w-full text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring mt-2"
                                                >
                                                    LogOut
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </>
                                :
                                <>
                                    <button className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-gray-800 transition">
                                        <Link to={'/SignIn'}>
                                            Login
                                        </Link>
                                    </button>
                                </>
                        }




                    </div>
                </nav>
            </div>
        </div>

    );
};

export default Navbar;