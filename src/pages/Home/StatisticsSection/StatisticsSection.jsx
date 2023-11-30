import StatisticsSectionCard from "./StatisticsSectionCard";
import CountUp from 'react-countup';
import 'react-countup/dist/esm/react-countup.css';

const StatisticsSection = () => {
    const parcelsBooked = 1500;
    const parcelsDelivered = 1200;
    const usersCount = 5000;

    return (
        <div className="flex justify-center mt-8">
            <StatisticsSectionCard icon="📦" title="Parcels Booked" value={parcelsBooked} />
            <StatisticsSectionCard icon="🚚" title="Parcels Delivered" value={parcelsDelivered} />
            <StatisticsSectionCard icon="👥" title="Users Count" value={usersCount} />
        </div>
    );
};

export default StatisticsSection;