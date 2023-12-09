import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import MyDeliveryListCard from "./MyDeliveryListCard";


const MyDeliveryList = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [deliveryManParcel, setDeliveryManParcel] = useState([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        axiosSecure.get(`/parcel/delivery-man/${user?.email}`)
            .then(res => {
                setDeliveryManParcel(res.data);
            })
    }, [axiosSecure, user?.email, refresh]);

    return (
        <>
            <div className="w-96 mx-auto text-center py-6 mb-6 border-y-[3px] border-orange-200">
                <h1 className="text-4xl">My Delivery List: {deliveryManParcel.length}</h1>
            </div>
            <div className="container mx-auto mb-40">
                <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            No.
                                        </label>
                                    </th>
                                    <th>Booked User&apos;s Name</th>
                                    <th>Receiver&apos;s Name</th>
                                    <th>Booked User&apos;s Phone</th>
                                    <th>Requested Delivery Date</th>
                                    <th>Approximate Delivery Date</th>
                                    <th>Receiver&apos;s phone number</th>
                                    <th>Receiver&apos;s Address</th>
                                    <th>Location</th>
                                    <th>Cancel</th>
                                    <th>Delivered</th>
                                </tr>
                            </thead>
                            {/* rows */}
                            <tbody>
                                {deliveryManParcel.map((item, idx) => (
                                    <MyDeliveryListCard key={item._id} idx={idx + 1} item={item} refresh={refresh} setRefresh={setRefresh} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyDeliveryList;