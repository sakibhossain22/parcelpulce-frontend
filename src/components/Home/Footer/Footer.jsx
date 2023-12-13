import { FaBeer, FaFacebook, FaInstagram, FaTwitch, FaTwitter } from "react-icons/fa";
const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-base-200 text-base-content">
                <aside>
                    <img className="w-24" src="https://i.ibb.co/3kt1bJG/LOGO-removebg-preview.png" alt="" />
                    <p className="text-xl font-bold">Parcel Pulce Ltd.</p>
                    <p>Providing reliable tech since 1992</p>
                </aside>
                <nav>
                    <header className="font-bold text-black">About</header>
                    <a className="link link-hover">About Us</a>
                    <a className="link link-hover">Features</a>
                    <a className="link link-hover">News</a>
                    <a className="link link-hover">Service</a>
                </nav>
                <nav>
                    <header className="font-bold text-black text">Company</header>
                    <a className="link link-hover">Our Team</a>
                    <a className="link link-hover">Partners</a>
                    <a className="link link-hover">FAQs</a>
                    <a className="link link-hover">Blog</a>
                </nav>
                <nav>
                    <header className="font-bold text-black">Support</header>
                    <a className="link link-hover">About</a>
                    <a className="link link-hover">Support Center</a>
                    <a className="link link-hover">Contact Us</a>
                </nav>
                <nav>
                    <header className="text-black font-bold">Get In Touch</header>
                    <a className="link link-hover">(+123) 456 789 123</a>
                    <a className="link link-hover">example@mail.com</a>
                    <div className="flex items-center gap-2">
                        <FaFacebook></FaFacebook>
                        <FaTwitch></FaTwitch>
                        <FaTwitter></FaTwitter>
                        <FaInstagram></FaInstagram>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;