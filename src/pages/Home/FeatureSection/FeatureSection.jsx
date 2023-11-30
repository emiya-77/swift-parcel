import FeatureSectionCard from "./FeatureSectionCard";
import { MdSecurity } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";


const FeatureSection = () => {
    return (
        <div className="my-20">
            <div className="mb-12 text-center">
                <h1 className="text-5xl mb-4 tracking-wider">Our Service and Promises</h1>
                <p className="text-2xl">Your safety and satisfaction is our biggest concern.</p>
            </div>
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
        </div>
    );
};

export default FeatureSection;