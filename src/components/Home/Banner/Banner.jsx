import { useSpring, animated } from 'react-spring';
import img from '../../../assets/banner.jpg'
const Banner = () => {
    const props = useSpring({
        marginLeft: '0',
        from: { marginLeft: '700px' },
        config: { duration: 500 },
    });
    return <div>
        <div style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', height: '70vh', }} >
            {/* <animated.div style={props}> */}
                <div className='flex ml-10 flex-col justify-center h-full'>
                    <p className='uppercase text-xl'>Upto <span className='text-[#ae1c9a] text-2xl font-bold'>70%</span> OFF</p>
                    <h1 className='text-2xl md:text-4xl lg:text-5xl my-6 font-bold'>Book Your First <br /> Parcel Now !</h1>
                    <button className='bg-[#ae1c9a] w-32 text-white rounded-xl py-2'>Book Now</button>
                </div>
            {/* </animated.div> */}
        </div>
        {/* <div className="hero h-[60vh]" style={{ backgroundImage: 'url(https://i.ibb.co/2MRbMF1/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment.jpg)' }}>
            <div className="hero-overlay bg-opacity-50"></div>
            <div className="hero-content text-center text-neutral-content">
                <animated.div style={props}>
                    <div>
                        <h1 className="lg:text-5xl text-3xl font-bold text-white leading-tight my-5"> Fast And Quick <br /><span className="text-red-600">Delivery</span> Service</h1>
                        <form>
                            <div className="flex">
                                <input type="text" placeholder="Type here" className="py-3 px-2 rounded-tl rounded-bl text-black w-full max-w-xs" />
                                <button className="bg-[#dc3545] rounded-tr rounded-br px-5">Search</button>
                            </div>
                        </form>
                    </div>
                </animated.div>;
            </div>
        </div> */}
    </div>



};

export default Banner;
