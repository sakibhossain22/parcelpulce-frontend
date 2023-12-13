import Confetti from 'react-confetti'
import lottie from '../../../assets/success.json';
import Lottie from 'lottie-react';
import { Helmet } from 'react-helmet';
const PaymentSuccess = () => {

    return (
        <div>
            <Helmet>
                <title>PARCELPULCE || PAYMENT SUCCESS</title>
            </Helmet>
            <Confetti className='w-full h-screen'>
            </Confetti>
            <div className='flex flex-col item-center justify-center h-screen'>
                <Lottie className='w-[400px] mx-auto' animationData={lottie}></Lottie>
                <h1 className='text-center text-3xl animation font-bold text-green-600'>Payment Successfull !</h1>
            </div>
        </div>
    )
};

export default PaymentSuccess;