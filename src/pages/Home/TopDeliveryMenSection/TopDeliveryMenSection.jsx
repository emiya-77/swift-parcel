import { useEffect, useState } from "react";
import TopDeliveryManCard from "./TopDeliveryManCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const TopDeliveryMenSection = () => {
    const axiosPublic = useAxiosPublic();
    const [topDeliveryMen, setTopDeliveryMen] = useState([]);

    useEffect(() => {
        axiosPublic.get('/top-delivery-men')
            .then(res => {
                setTopDeliveryMen(res.data);
            })
    }, [axiosPublic]);

    return (
        <div className="container mx-auto my-20">
            <div className="mb-12 text-center">
                <h1 className="text-5xl mb-4 tracking-wider">Our Top Delivery Men</h1>
                <p className="text-2xl">Best on the job. Fastest and the most reliable in the world.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {topDeliveryMen.map(deliveryMan => (
                    <TopDeliveryManCard key={deliveryMan.id} deliveryMan={deliveryMan} />
                ))}
            </div>
        </div>
    );
};

export default TopDeliveryMenSection;