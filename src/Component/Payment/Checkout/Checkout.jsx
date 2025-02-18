import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Auth/Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const Checkout = () => {

    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();

    const { user } = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const productIds = cart.map((item) => item._id);
        console.log(productIds);

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // 🟢 **Step 1: Payment Intent Create API Call (Only Sending ProductIds)**
        const paymentIntentResponse = await axiosSecure.post('/api/v1/stripePayment/create-payment-intent', {
            productIds: productIds // Only sending productIds
        });

        const clientSecret = paymentIntentResponse.data.clientSecret;
        // setClientSecret(clientSecret);
        console.log("Client Secret Received:", clientSecret);

        // 🟢 **Step 2: Create Payment Method**
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });

            setError(error.message);
            return;
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        // Confirm payment
        const { paymentIntent, confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous email',
                    name: user?.displayName || 'anonymous name'
                }
            }
        });

        if (confirmError) {
            console.log('confirmError', confirmError);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
            return;
        } else {
            // Payment success
            if (paymentIntent.status === 'succeeded') {
                console.log(paymentIntent.id, " paymentIntent id");
                setTransactionId(paymentIntent.id);

                elements.getElement(CardElement).clear();

                // 🟢 **Step 3: Call the payment-success API**
                try {
                    const paymentSuccessResponse = await axiosSecure.post('/api/v1/stripePayment/payment-success', {
                        paymentIntentId: paymentIntent.id,
                        productIds: productIds,
                        userEmail: user?.email,
                    });

                    // If successful, you can trigger refetch or update UI as needed
                    console.log(paymentSuccessResponse.data.message);
                    refetch(); // Refetch or perform any action you need after success
                } catch (error) {
                    console.error("Error calling payment-success API:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to update cart and payment history.",
                    });
                }
            }
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <div className=" mb-8 ">
                <h1 className="text-2xl text-black font-semibold text-center border-2 border-blue-400 p-2 mt-3">Your Name : {user?.displayName}</h1>
                <h1 className="text-2xl text-black font-semibold text-center  border-2 border-blue-400 p-2 mt-3">Your Email :  {user?.email}</h1>
            </div>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
                className="border-2 border-blue-400 p-10"
            />

            <button className="inline-flex items-center  lg:ml-60 justify-center w-full px-4 py-3 text-base font-bold leading-6 text-white  border-transparent rounded-full md:w-auto hover:bg-indigo-500 bg-indigo-600 hover:bg-transparent hover:outline hover:text-black cursor-pointer mt-10" type="submit">
                Pay Stripe
            </button>
            <p className="text-red-600 font-bold text-xl">{error}</p>
            {transactionId && <p className="text-green-500 text-xl font-bold mt-5">Your Transaction id : {transactionId}</p>}
        </form>
    );
};

export default Checkout;