import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import Banner from "./Banner/Banner";
import OurFeatures from "./OurFeatures/OurFeatures";
import HomeStats from "./HomeStats/HomeStats";
import TopDeliveryMen from "./TopDeliveryMen/TopDeliveryMen";
import { Helmet } from "react-helmet";
import Offer from "./Offer/Offer";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>PARCELPULCE || HOME</title>
            </Helmet>
            <Navbar></Navbar>
            <Banner></Banner>
            <div className="max-w-7xl mx-auto">
                <OurFeatures></OurFeatures>
                <Offer></Offer>
                <HomeStats></HomeStats>
                <TopDeliveryMen></TopDeliveryMen>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;