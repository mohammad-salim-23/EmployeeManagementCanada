import { useContext } from "react";
import useAxiosSecure from "../../../Component/hooks/useAxiosSecure";
import useGetProduct from "../../../Component/hooks/useGetProduct";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";
import useAllUsers from "../../../Component/hooks/useAllUsers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
    const axiosSecure = useAxiosSecure();
    const [products] = useGetProduct();
    const { user } = useContext(AuthContext);
    const [users] = useAllUsers();
    const navigate = useNavigate()
    const currentUser = user?.email;

    // Find if current user is a reseller
    const isReseller = users?.some(user => user.role === 'reseller' && user.email === currentUser);

    const handleAddToCart = async (info) => {
        const productInfo = {
            productName: info?.productName,
            email: user?.email,
            productPrice: isReseller ? info?.resellerPrice : info?.customerPrice,
            date: new Date(),
            // userName: user.displayName,
            productId: info?._id,
            productImage: info?.image,
        };
        try {
            if (!user) {

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You are not logged in. Please login first",
                    footer: '<a href="/SignIn">Login</a>'
                });
                navigate('/SignIn')
            } else {
                const response = await axiosSecure.post('/cart', productInfo);
                console.log(response.data)
                if (response?.data?.success === true) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }

        } catch {
            console.log('something went wrong')
        }

    };

    return (
        <>
            <h2 className="container mx-auto px-6 mt-20 text-3xl md:text-4xl font-bold text-center text-gray-800 relative before:absolute before:w-16 before:h-1 before:bg-blue-500 before:rounded-full before:bottom-0 before:left-1/2 before:-translate-x-1/2">
                Our Products
            </h2>

            <div className="flex mt-20 flex-wrap gap-6 justify-center">
                {products.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 p-4 w-72">

                        {/* Product Image */}
                        <div className="relative">
                            <img src={item?.image} alt={item?.productName} className="w-full h-48 object-cover rounded-lg" />
                            <span className={`absolute top-2 right-2 text-xs font-bold px-3 py-1 rounded-full 
                            ${item.status === 'In Stock' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {item.status}
                            </span>
                        </div>

                        {/* Product Details */}
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-gray-800">{item?.productName}</h2>
                            <p className="text-gray-600 text-sm">Quantity: <span className="font-medium">{item?.quantity}</span></p>
                            <div className="flex justify-between items-center mt-3">
                                {
                                    isReseller ? <>
                                        <span className="text-xl font-bold text-violet-600">
                                            ${item?.resellerPrice}
                                        </span>
                                    </>
                                        :
                                        <>
                                            <span className="text-xl font-bold text-violet-600">
                                                ${item?.customerPrice}
                                            </span>
                                        </>
                                }

                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 transition duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductCard;
