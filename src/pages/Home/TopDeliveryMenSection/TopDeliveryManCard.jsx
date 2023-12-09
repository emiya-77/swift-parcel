import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const TopDeliveryManCard = ({ deliveryMan }) => {
    const axiosPublic = useAxiosPublic();
    const { email, name, image, parcelsDelivered, averageRatings } = deliveryMan || {};
    const [deliveredParcel, setDeliveredParcel] = useState([]);

    useEffect(() => {
        axiosPublic.get(`/parcel-delivered/${email}`)
            .then(res => {
                const filteredParcels = res.data.filter(item => item.status === 'delivered');
                setDeliveredParcel(filteredParcels);
            })
    }, [axiosPublic, email]);

    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <img src={image || ''} alt={name} className="w-full h-40 object-cover mb-4 rounded-md" />
            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <p className="text-gray-600 mb-2">Parcels Delivered: {deliveredParcel.length || ''}</p>
            <p className="text-gray-600">Average Ratings: {averageRatings || ''}</p>
        </div>
    );
};

export default TopDeliveryManCard;