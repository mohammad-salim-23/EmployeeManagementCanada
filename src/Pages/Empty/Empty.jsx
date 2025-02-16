import { Link } from 'react-router-dom'

const Empty = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen  p-6">


                {/* Card Container */}
                <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl transform transition duration-500 hover:scale-105 text-center">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto mb-8 animate-pulse">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="white"
                            className="w-12 h-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7H18.4l-1.4-7M7 13H3m0 0a1 1 0 00-1 1h0a1 1 0 001 1h3m11 0h3a1 1 0 001-1h0a1 1 0 00-1-1h-3M6 21h12a1 1 0 001-1H5a1 1 0 001 1z"
                            />
                        </svg>
                    </div>

                    {/* Heading */}
                    <h3 className="text-3xl font-extrabold text-gray-800 mb-4">
                        Your Cart is Empty
                    </h3>

                    {/* Subtext */}
                    <p className="text-gray-500 mb-8 px-4">
                        It looks like you haven’t added anything to your cart yet. Discover amazing items and start your shopping journey!
                    </p>

                    {/* Button */}
                    <Link to={'/'}>
                        <button className="px-8 py-3 bg-[#2C3E50] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300">
                            Explore Products
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Empty
