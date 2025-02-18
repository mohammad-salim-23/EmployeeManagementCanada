// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import Checkout from "../Checkout/Checkout";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout/Checkout";

const stripPromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {


    return (
        <div>

            <div className="lg:w-[650px] mx-auto container lg:mt-24">
                <Elements stripe={stripPromise}>
                    <Checkout ></Checkout>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;