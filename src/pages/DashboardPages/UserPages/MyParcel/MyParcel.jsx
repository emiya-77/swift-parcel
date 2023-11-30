import { useEffect, useState } from "react";
import useParcel from "../../../../hooks/useParcel";
import MyParcelCard from "./MyParcelCard";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";


const MyParcel = () => {
    // const [parcel] = useParcel();
    const [refresh, setRefresh] = useState(false);
    const axiosPublic = useAxiosPublic();
    const [parcel, setParcel] = useState([]);

    useEffect(() => {
        axiosPublic.get('/parcel')
            .then(res => {
                setParcel(res.data);
            })
    }, [refresh, axiosPublic]);

    return (
        <>
            <div className="w-96 mx-auto text-center py-6 mb-6 border-y-[3px] border-orange-200">
                <h1 className="text-4xl">My Parcels</h1>
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
                                    <th>Parcel Type</th>
                                    <th>Requested Delivery Date</th>
                                    <th>Approximate Delivery Date</th>
                                    <th>Booking Date</th>
                                    <th>Delivery Men ID</th>
                                    <th>Booking Status</th>
                                    <th>Update/Cancel</th>
                                    <th>Review</th>
                                    <th>Pay</th>
                                </tr>
                            </thead>
                            {/* rows */}
                            <tbody>
                                {
                                    parcel.map((item, idx) => <MyParcelCard key={item._id} idx={idx + 1} refresh={refresh} setRefresh={setRefresh} item={item}></MyParcelCard>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyParcel;