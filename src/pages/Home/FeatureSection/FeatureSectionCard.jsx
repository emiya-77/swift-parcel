

const FeatureSectionCard = ({ icon, title, description }) => {
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-4">
            <div className="flex items-center justify-center h-40 bg-orange-100 text-orange-950">
                <span className="text-7xl">{icon}</span>
            </div>
            <div className="py-6 px-8">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-700">{description}</p>
            </div>
        </div>
    );
};

export default FeatureSectionCard;