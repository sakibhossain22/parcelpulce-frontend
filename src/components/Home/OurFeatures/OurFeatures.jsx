import { useSpring, animated } from 'react-spring';

const OurFeatures = () => {
  const props = useSpring({ scale: 1, from: { scale: 0 } });
  return <animated.div style={props}>
    <div className="my-5">
    <h1 className="font-bold text-3xl my-5 mx-5 border-l-4 border-red-600 px-4">Our Features</h1>
    <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-3 gap-10 items-center justify-around mx-5">
      <div className="border px-5 py-3 rounded-lg shadow-md hover:shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500">
        <img className="w-20 rounded-full border border-white mb-4" src="https://i.ibb.co/zbTHw5p/3d-safe-internet-cyber-security-icon-illustration-rendering-png-1.jpg" alt="" />
        <h1 className="text-2xl font-bold text-white my-5">Parcel Safety</h1>
        <p className="text-white">Advanced safety measures ensure your parcels are handled with the utmost care</p>
      </div>
      <div className="border px-5 py-3 rounded-lg shadow-md hover:shadow-lg bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500">
        <img className="w-20 rounded-full border border-white mb-4" src="https://i.ibb.co/Czc19tB/10256640-1.jpg" alt="" />
        <h1 className="text-2xl font-bold text-white my-5">Super Fast Delivery</h1>
        <p className="text-white">Experience lightning-fast delivery services, reaching your destination with speed and efficiency</p>
      </div>
      <div className="border px-5 py-3 rounded-lg shadow-md hover:shadow-lg bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500">
        <img className="w-20 bg-white rounded-full border border-white mb-4" src="https://i.ibb.co/VYXT5Wh/1248317.png" alt="" />
        <h1 className="text-2xl font-bold text-white my-5">Live Tracking</h1>
        <p className="text-white">Track your parcels in real-time, providing you with accurate updates on their journey to your doorstep.</p>
      </div>
    </div>
  </div></animated.div>;
};

export default OurFeatures;
