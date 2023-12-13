/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [transactionId, setTransactionId] = useState(null);
    const totalPrice = parseInt(location?.state?.price);

    useEffect(() => {
        if (totalPrice > 0) {
            fetch("https://parcel-pulse-server.vercel.app/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ price: totalPrice }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [totalPrice]);

    const CheckOutForm = () => {
        const stripe = useStripe();
        const elements = useElements();
        const [isProcessing, setIsProcessing] = useState(false);

        const handleSubmit = async (event) => {
            event.preventDefault();

            if (!stripe || !elements || isProcessing) {
                return;
            }

            const card = elements.getElement(CardElement);

            if (card == null) {
                return;
            }

            setIsProcessing(true);

            try {
                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    type: 'card',
                    card,
                });

                if (error) {
                    console.error('[error]', error);
                    setErrorMessage(error.message);
                    setSuccessMessage('');
                } else {
                    setErrorMessage('');

                    // Confirm Payment
                    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                        clientSecret,
                        {
                            payment_method: {
                                card: card,
                                billing_details: {
                                    name: user?.displayName,
                                    email: user?.email,
                                },
                            },
                        },
                    );

                    if (confirmError) {
                        console.error('Error during payment confirmation:', confirmError);
                    } else {
                        if (paymentIntent?.status === 'succeeded') {
                            setTransactionId(paymentIntent?.id);
                            setSuccessMessage(transactionId);
                            navigate('/dashboard/payment-success');
                        }
                    }
                }
            } finally {
                // Reset processing status after payment is complete
                setIsProcessing(false);
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <CardElement
                    className="border-gray-400 rounded border-2 px-5 py-3"
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
                />
                <button
                    className="px-10 w-full my-10 text-white py-2 bg-blue-600 rounded"
                    type="submit"
                    disabled={!stripe || totalPrice < 1 || isProcessing}
                >
                    {isProcessing ? 'Processing...' : 'Pay'}
                </button>
                <p className="text-red-600">{errorMessage}</p>
                <p className="text-green-600">{successMessage}</p>
            </form>
        );
    };

    return (
        <div>
            <Helmet>
                <title>PARCELPULCE || PAYMENT</title>
            </Helmet>
            <div className="my-5">
                <DashboardHeader header='Payment'></DashboardHeader>
            </div>
            <div className="flex items-center p-10 justify-center ">
                <div className="w-6/12 mx-auto">
                    <Elements stripe={stripePromise}>
                        <CheckOutForm />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
