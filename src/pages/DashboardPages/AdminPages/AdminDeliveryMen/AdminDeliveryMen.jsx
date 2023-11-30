import { useEffect, useState } from "react";
import useUsers from "../../../../hooks/useUsers";
import AdminDeliveryCard from "./AdminDeliveryCard";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const AdminDeliveryMen = () => {
    const axiosSecure = useAxiosSecure();
    const [deliveryMen, setDeliveryMen] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axiosSecure.get('/users/delivery-man')
            .then(res => {
                setDeliveryMen(res.data);
            })
    }, [refresh, axiosSecure]);

    return (
        <>
            <div className="w-96 mx-auto text-center py-6 mb-6 border-y-[3px] border-orange-200">
                <h1 className="text-4xl">All Delivery Men: {deliveryMen.length}</h1>
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
                                    <th>Delivery Man&apos;s Name</th>
                                    <th>Phone Number</th>
                                    <th>Number of parcel delivered</th>
                                    <th>Average Review</th>
                                </tr>
                            </thead>
                            {/* rows */}
                            <tbody>
                                {
                                    deliveryMen.map((item, idx) => <AdminDeliveryCard key={item._id} idx={idx + 1} item={item} refresh={refresh} setRefresh={setRefresh}></AdminDeliveryCard>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDeliveryMen;