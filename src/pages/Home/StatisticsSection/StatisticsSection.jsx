import StatisticsSectionCard from "./StatisticsSectionCard";
import { PiPackageThin } from 'react-icons/pi';
import { FaTruckFast } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const StatisticsSection = () => {
    const axiosPublic = useAxiosPublic();
    const [parcelsBooked, setParcelsBooked] = useState(0);
    const [parcelsDelivered, setParcelsDelivered] = useState(0);
    const [usersCount, setUsersCount] = useState(0);

    useEffect(() => {
        axiosPublic.get('/home-stats')
            .then(res => {
                const { bookedParcelsCount, deliverdParcelsCount, usersCount } = res.data || {};
                setParcelsBooked(bookedParcelsCount);
                setParcelsDelivered(deliverdParcelsCount);
                setUsersCount(usersCount);
            })
    }, [axiosPublic]);

    return (
        <div className="my-20">
            <div className="mb-12 text-center">
                <h1 className="text-5xl mb-4 tracking-wider">Our Results</h1>
                <p className="text-2xl">Satisfied Customers</p>
            </div>
            <div className="container mx-auto flex justify-center flex-wrap gap-4 my-12">
                <StatisticsSectionCard icon={<PiPackageThin />} title="Parcels Booked" value={parcelsBooked} />
                <StatisticsSectionCard icon={<FaTruckFast />} title="Parcels Delivered" value={parcelsDelivered} />
                <StatisticsSectionCard icon={<FaUsers />} title="Users Count" value={usersCount} />
            </div>
        </div>
    );
};

export default StatisticsSection;