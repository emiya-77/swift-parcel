import CountUp from 'react-countup';

const StatisticsSectionCard = ({ icon, title, value }) => {
    return (
        <div className="flex-shrink-0 mx-4 bg-white rounded-lg overflow-hidden shadow-md">
            <div className="p-12">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <span className="text-4xl">{icon}</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">{title}</p>
                        <p className="text-lg text-gray-500">
                            <CountUp end={value} duration={2} separator="," />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsSectionCard;