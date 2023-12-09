import { useEffect, useState } from "react";
import useParcel from "../../../../hooks/useParcel";
import MyParcelCard from "./MyParcelCard";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const MyParcel = () => {
    // const [parcel] = useParcel();
    const [refresh, setRefresh] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [parcel, setParcel] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('All');

    useEffect(() => {
        axiosSecure.get(`/parcel/${user.email}`)
            .then(res => {
                setParcel(res.data);
            })
    }, [refresh, axiosSecure, user.email]);

    const filteredParcel = selectedStatus === 'All'
        ? parcel
        : parcel.filter(item => item.status === selectedStatus);

    return (
        <>
            <div className="w-96 mx-auto text-center py-6 mb-6 border-y-[3px] border-orange-200">
                <h1 className="text-4xl">My Parcels</h1>
            </div>
            <div className="container mx-auto mb-40">
                <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Filter by Status:</label>
                        <select
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="pending">Pending</option>
                            <option value="on the way">On the Way</option>
                            <option value="canceled">Canceled</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
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
                                    filteredParcel.map((item, idx) => <MyParcelCard key={item._id} idx={idx + 1} refresh={refresh} setRefresh={setRefresh} item={item}></MyParcelCard>)
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