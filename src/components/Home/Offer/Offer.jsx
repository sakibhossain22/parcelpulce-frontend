import img1 from '../../../assets/square1.png'
import img2 from '../../../assets/square2.png'
const Offer = () => {
    return (
        <div>
            <h1 className="font-bold text-3xl my-5 mx-5 border-l-4 border-red-600 px-4">Offers</h1>
            <div className='lg:flex items-center justify-center gap-5 mx-5'>
                <div className='bg-[#cdfffe] flex items-center justify-center  mb-5 lg:w-1/2'>
                    <div>
                        <img src={img1} alt="" />
                    </div>
                    <div className='flex  flex-col justify-center'>
                        <p className='uppercase '>New Offer</p>
                        <h1 className='text-2xl my-2 font-bold'>Get 65% Off Use Coupon !</h1>
                        <button className='bg-[#ae1c9a] w-32 text-white rounded-xl py-2'>Book Now</button>
                    </div>
                </div>
                <div className='bg-[#f9cbe2] pt-16 flex flex-row-reverse items-center justify-center mb-5 lg:w-1/2'>
                    <div>
                        <img src={img2} alt="" />
                    </div>
                    <div className='flex ml-10 flex-col justify-center'>
                        <p className='uppercase '>New Offer</p>
                        <h1 className='text-2xl my-2 font-bold'>Get 75% Off On Multiple Order !</h1>
                        <button className='bg-[#ae1c9a] w-32 text-white rounded-xl py-2'>Book Now</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Offer;