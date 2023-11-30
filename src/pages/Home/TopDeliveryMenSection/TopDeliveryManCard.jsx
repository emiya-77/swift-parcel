

const TopDeliveryManCard = ({ deliveryMan }) => {
    const { name, image, parcelsDelivered, averageRatings } = deliveryMan || {};

    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <img src={image || ''} alt={name} className="w-full h-40 object-cover mb-4 rounded-md" />
            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <p className="text-gray-600 mb-2">Parcels Delivered: {parcelsDelivered || ''}</p>
            <p className="text-gray-600">Average Ratings: {averageRatings || ''}</p>
        </div>
    );
};

export default TopDeliveryManCard;