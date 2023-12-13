/* eslint-disable react/prop-types */
import '@smastrom/react-rating/style.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../../Hooks/AxiosSecure/useAxiosSecure';

const DeliveryMan = ({ man }) => {
    // eslint-disable-next-line no-unused-vars
    const [rating, setRating] = useState(man?.rating)
    console.log(man?._id);
    const axiosSecure = useAxiosSecure()
    const [averageRating, setAverageRating] = useState(0)
    console.log(averageRating);
    useEffect(() => {
        axiosSecure.get(`/average-review?deliveryMenId=${man?._id}`)
            .then(res => {
                setAverageRating(res.data.averageRating)
            })
            .catch(error => {
                console.error(error);
            });
    }, [axiosSecure, man?._id]);
    return (
        <div>
            <div>
                <div className="drop-shadow-xl bg-white rounded-lg overflow-hidden transition-transform hover:transform hover:scale-105">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <div className="card-media-container">
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={man?.image}
                                    alt="delivery Man"
                                />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    <h1 className='font-bold'>{man?.name}</h1>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <p className='text-black my-2'><span>Parcel Delivered : </span><span className='font-bold'>{man?.parcelsDelivered || 0}</span></p>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                   <p>Average Ratings : <span className='font-bold text-black'>{averageRating?.toFixed(2) || 0}</span></p>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default DeliveryMan;