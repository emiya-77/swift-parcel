import FeatureSectionCard from "./FeatureSectionCard";
import { MdSecurity } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";


const FeatureSection = () => {
    return (
        <div className="container mx-auto my-12 flex flex-wrap justify-center">
            <FeatureSectionCard
                icon={<MdSecurity></MdSecurity>}
                title="Secure Deliveries"
                description="Our top priority is the safety of your parcels. With state-of-the-art security measures, your deliveries are in safe hands from pick-up to drop-off."
            />
            <FeatureSectionCard
                icon={<FaShippingFast></FaShippingFast>}
                title="Swift Dispatch"
                description="Experience the speed of Swift Parcel! We guarantee swift and efficient deliveries, ensuring your parcels reach their destination in record time."
            />
            <FeatureSectionCard
                icon={<AiOutlineGlobal></AiOutlineGlobal>}
                title="Live Parcel Updates"
                description="Stay informed every step of the way. Our real-time tracking feature allows you to monitor your parcel's journey, providing peace of mind and transparency."
            />
        </div>
    );
};

export default FeatureSection;