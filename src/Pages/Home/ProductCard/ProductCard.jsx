// import useAxiosPublic from "../../../Component/hooks/useAxiosPublic";
import { useContext } from "react";
import useAxiosSecure from "../../../Component/hooks/useAxiosSecure";
import useGetProduct from "../../../Component/hooks/useGetProduct"
import { AuthContext } from "../../../Auth/Provider/AuthProvider";
import useAllUsers from "../../../Component/hooks/useAllUsers";

const ProductCard = () => {
    const axiosSecure = useAxiosSecure();
    const [products] = useGetProduct();
    const { user } = useContext(AuthContext)
    const [users] = useAllUsers();
    const customers = users?.filter(user => user.role === 'customer');
    const reSeller = users?.filter(user => user.role === 'customer');
    const handleAddToCart = async (info) => {
        const productInfo = {
            productName: info?.productName,
            email: user?.email,

            user: 'arif'
        }
        const response = await axiosSecure.post('/cart', productInfo)
        console.log(response.data)

    }
    return (
        <div className="flex flex-wrap gap-6 justify-center">
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
                            <span className="text-xl font-bold text-violet-600">${item?.customerPrice}</span>
                            <button onClick={() => handleAddToCart(item)} className="px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 transition duration-300">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductCard
