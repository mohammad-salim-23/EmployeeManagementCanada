import { CgShoppingCart } from "react-icons/cg";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="">
            <div className="text-center mb-5">
                <nav className="bg-[#2C3E50] text-white px-4 py-5 flex items-center justify-between">
                    <div className="text-2xl font-bold">Logo</div>

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

                        <Link to={'/SignIn'}>
                            <button className="border border-white px-4 py-1 rounded-md hover:bg-white hover:text-gray-800 transition">
                                Login
                            </button>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
        // Comment Added

    );
};

export default Navbar;