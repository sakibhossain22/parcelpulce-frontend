import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";


const UpdateParcel = () => {
    const axiosSecure = useAxiosSecure()
    const data = useLoaderData()
    console.log(data);
    const [price, setPrice] = useState(0);

    const priceHandle = (e) => {
        const value = parseInt(e.target.value, 10);


        // Calculate the price based on the given rules
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
        const info = { name, email, number, type, weight, receiverName, receiverNumber, address, requestedDeliveryDate, latitude, longitude, price: amount, status: 'pending', bookingDate }
        console.log(data);
        axiosSecure.patch(`/percelUpdate/${data?._id}`, info)
            .then(data => {
                console.log(data.data);
                if (data.data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Parcel Updated Successfully!',
                        confirmButtonText: 'OK'
                    })
                }
            })
    }
    return (
        <div>
            <Helmet>
                    <title>PARCELPULCE || UPDATE</title>
                </Helmet>
            <div>
                <div>
                    <DashboardHeader header={'Update A Parcel'}></DashboardHeader>
                    <div>
                        <div className="mx-5 mt-0">
                            <form onSubmit={handleUpdate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="firstName">
                                            Name
                                        </label>
                                        <input name="name" disabled defaultValue={data?.name}
                                            className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="firstName"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                            Email
                                        </label>
                                        <input name="email" disabled defaultValue={data?.email}
                                            className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="email"

                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                            Phone Number
                                        </label>
                                        <input name="number" placeholder="Percel Type..." defaultValue={data?.number}
                                            className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="number"

                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                            Percel Type
                                        </label>
                                        <input name="type" placeholder="Percel Type..." defaultValue={data?.type}
                                            className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="text"

                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                            Parcel Weight (KG)
                                        </label>
                                        <input onChange={priceHandle} name="weight" placeholder="Parcel Weight..." defaultValue={data?.weight}
                                            className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="number"

                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                            Receiver’s Name
                                        </label>
                                        <input defaultValue={data?.receiverName} name="receiverName" placeholder="Receiver’s Name..."
                                            className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="text"

                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                            Receiver’s Phone Number
                                        </label>
                                        <input defaultValue={data?.receiverNumber} name="receiverNumber" placeholder="Receiver’s Phone Number..."
                                            className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="number"

                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                            Parcel Delivery Address
                                        </label>
                                        <input defaultValue={data?.address} placeholder="Parcel Delivery Address...." name="address"
                                            className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="text"

                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                            Requested Delivery Date
                                        </label>
                                        <input defaultValue={data?.requestedDeliveryDate} placeholder="Requested Delivery Date..." name="requestedDate"
                                            className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="date"

                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                            Delivery Address Latitude
                                        </label>
                                        <input defaultValue={data?.latitude} placeholder="Delivery Address Latitude..." name="latitude"
                                            className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="text"

                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                            Delivery Address longitude
                                        </label>
                                        <input defaultValue={data?.longitude} placeholder="Delivery Address Longitude..." name="longitude"
                                            className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="text"

                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="lastName">
                                            Price
                                        </label>
                                        <input  defaultValue={data?.price} value={price} placeholder="price..." name="price" disabled
                                            className="rounded shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="lastName"
                                            type="text"

                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <input className="bg-[#dc3545] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                        type="submit" value='Update' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateParcel;