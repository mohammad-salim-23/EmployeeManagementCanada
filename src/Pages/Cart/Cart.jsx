import { TbCurrencyTaka } from "react-icons/tb";
import useCart from "../../Component/hooks/useCart";
import { RxCross1 } from "react-icons/rx";
import useAxiosSecure from "../../Component/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Empty from "../Empty/Empty";

const Cart = () => {
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    const totalPrice = cart.reduce((total, item) => {
        const price = parseInt(item.productPrice);
        return total + price;
    }, 0);


    const shipping = 120;
    const subTotal = totalPrice + shipping;


    const handleRemoveItem = async (cartId) => {
        try {
            await axiosSecure.delete(`/cart/${cartId}`);
            await refetch();
            // toast.success("Product removed successfully");
        } catch (error) {
            // console.error("Error removing item:", error);
            toast.error(error);
        }
    };
    if (cart < 1) {
        return <Empty message={'Your cart is empty'} address={'/shop'} label={'Go To Shop'}></Empty>
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 lg:p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Your Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items Section */}
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-600">Items in your cart</h2>

                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item._id} className="flex items-center gap-4 p-4 border-b border-gray-200">
                                    <img src={item?.productImage} alt={item.productName} className="w-24 h-24 rounded" />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-700">{item.productName}</h3>
                                        {/* <p className="text-gray-500">Color: {item.color}</p> */}
                                        <span className="text-gray-700 font-bold">${item.productPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {/* Quantity Controls */}
                                        <button onClick={() => handleRemoveItem(item._id)} className='text-2xl text-red-500 hover:text-red-700 ml-2 border p-2 rounded-full hover:bg-red-300'>
                                            <RxCross1 />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                    {/* Cart Summary Section */}
                    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-600">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-700 font-semibold flex items-center"><TbCurrencyTaka />{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-gray-700 font-semibold flex items-center"><TbCurrencyTaka />{shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-4 mb-4">
                            <span className="text-xl font-semibold text-gray-700">Total</span>
                            <span className="text-xl flex items-center font-bold text-gray-900"><TbCurrencyTaka />{subTotal.toFixed(2)}</span>
                        </div>

                        <button
                            // onClick={handleCheckout}
                            className="w-full bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300"
                            disabled={cart.length === 0}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cart
