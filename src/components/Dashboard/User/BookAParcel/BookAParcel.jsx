import { useContext, useState } from "react";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { Helmet } from "react-helmet";

const BookAParcel = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [price, setPrice] = useState(0);

    const priceHandle = (e) => {
        const value = parseInt(e.target.value, 10);



        let calculatedPrice;
        if (value === 1) {
            calculatedPrice = 50;
        } else if (value === 2) {
            calculatedPrice = 100;
        } else if (value > 2) {
            calculatedPrice = 150 * value;
        } else {
            calculatedPrice = 0;
        }
        setPrice(calculatedPrice);
    };
    const handleUpdate = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const number = form.number.value
        const type = form.type.value;
        const weight = form.weight.value;
        const receiverName = form.receiverName.value;
        const receiverNumber = form.receiverNumber.value;
        const requestedDeliveryDate = form.requestedDate.value;
        const address = form.address.value
        const longitude = form.longitude.value
        const latitude = form.latitude.value
        const amount = form.price.value
        const bookingDate = new Date()
        const data = { name, email, number, type, weight, receiverName, receiverNumber, address, requestedDeliveryDate, latitude, longitude, price: amount, status: 'pending', bookingDate }
        console.log(data);
        axiosSecure.post(`/book-parcel`, data, { withCredentials: true })
            .then(data => {
                if (data.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Parcel Added Successfully!',
                        confirmButtonText: 'OK'
                    })
                }
            })
    }
    return (
        <div>
            <Helmet>
                    <title>PARCELPULCE || BOOK PARCEL</title>
                </Helmet>
            <div>
                <DashboardHeader header={'Book A Parcel'}></DashboardHeader>
                <div>
                    <div className="mx-5 mt-0">
                        <form onSubmit={handleUpdate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="firstName">
                                        Name
                                    </label>
                                    <input required name="name" defaultValue={user?.displayName} disabled
                                        className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="firstName"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                        Email
                                    </label>
                                    <input required name="email" defaultValue={user?.email} disabled
                                        className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="email"

                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                        Phone Number
                                    </label>
                                    <input required name="number" placeholder="Percel Type..."
                                        className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="number"

                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                        Percel Type
                                    </label>
                                    <input required name="type" placeholder="Percel Type..."
                                        className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="text"

                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                        Parcel Weight (KG)
                                    </label>
                                    <input required onChange={priceHandle} name="weight" placeholder="Parcel Weight..."
                                        className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="number"

                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                        Receiver’s Name
                                    </label>
                                    <input required name="receiverName" placeholder="Receiver’s Name..."
                                        className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="text"

                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                        Receiver’s Phone Number
                                    </label>
                                    <input required name="receiverNumber" placeholder="Receiver’s Phone Number..."
                                        className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="number"

                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                        Parcel Delivery Address
                                    </label>
                                    <input required placeholder="Parcel Delivery Address...." name="address"
                                        className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="text"

                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                        Requested Delivery Date
                                    </label>
                                    <input required placeholder="Requested Delivery Date..." name="requestedDate"
                                        className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="date"

                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                        Delivery Address Latitude
                                    </label>
                                    <input required placeholder="Delivery Address Latitude..." name="latitude"
                                        className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="text"

                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                        Delivery Address longitude
                                    </label>
                                    <input required placeholder="Delivery Address Longitude..." name="longitude"
                                        className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="text"

                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                        Price
                                    </label>
                                    <input required placeholder="price..." name="price" value={price} disabled
                                        className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="lastName"
                                        type="text"

                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <input className="bg-[#dc3545] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                    type="submit" value='Book' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAParcel;