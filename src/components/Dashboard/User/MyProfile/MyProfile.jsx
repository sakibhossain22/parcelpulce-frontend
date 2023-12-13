import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
const image_hosting_key = import.meta.env.VITE_IMAGEBB_API
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const MyProfile = () => {
    const axiosSecure = useAxiosSecure()
    const { user, updateUser } = useContext(AuthContext)
    const [data, setData] = useState()
    useEffect(() => {
        axiosSecure.get(`/my-parcel?email=${user?.email}`)
            .then(res => {
                console.log(res.data);
                setData(res.data)
            })
    }, [axiosSecure, user?.email])

    const handleProfileUpdate = (e) => {
        e.preventDefault();

        const imageFile = e.target.image.files[0];

        if (!imageFile) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Provide Image",
            });
        }

        const formData = new FormData();
        formData.append('image', imageFile);

        fetch(image_hosting_api, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(res => {
                console.log(res.data);
                const name = user?.displayName
                const photo = res?.data?.display_url
                updateUser(name, photo)})
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    return (
        <div className="mx-5">
            <Helmet>
                    <title>PARCELPULCE || PROFILE</title>
                </Helmet>
            <h1 className="text-4xl mb-6 mt-5">Hi ! <span className="font-bold">Wellcome Back</span></h1>
            <div className="grid gap-5 grid-cols-12">
                <div className="col-span-5 border-4 px-5 py-10 rounded">
                    <div>
                        <img className="w-48 h-48 rounded-full mx-auto mb-4" src={user?.photoURL} alt="" />
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-bold">{user?.displayName}</h1>
                            <p>Email : <span className="font-bold">{user?.email}</span></p>
                            <p>Location : <span className="font-bold">BD</span></p>
                        </div>
                    </div>
                    <div className="divider font-bold">Update Profile</div>
                    <div>
                        <form onSubmit={handleProfileUpdate}>
                            <input name="image" type="file" className="file-input file-input-bordered w-full max-w-xs" />
                            <button className="bg-red-400 w-full px-2 py-3 text-white font-bold my-5 rounded">Update</button>
                        </form>
                    </div>
                </div>
                <div className="col-span-7">
                    <div>
                        <table className="table border-b-2 w-full ">
                            <thead>
                                <tr className="bg-[#e65c6a] text-white rounded">
                                    <th>Type</th>
                                    <th>Weight</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map(item => (
                                    <tr className="bg-gray-200 border-red-300" key={item._id}>
                                        <td className="font-bold">{item?.type}</td>
                                        <td className="font-bold">{item?.weight} KG</td>
                                        <td className="font-bold">{item?.price} $</td>
                                        <td className="font-bold">{item?.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyProfile;