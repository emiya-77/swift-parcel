import useUsers from "../../../../hooks/useUsers";
import AdminDeliveryCard from "./AdminDeliveryCard";


const AdminDeliveryMen = () => {
    const [users] = useUsers();
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
                                    <th>User&apos;s Name</th>
                                    <th>User&apos;s Phone</th>
                                    <th>Booking Date</th>
                                    <th>Requested Delivery Date</th>
                                    <th>Cost</th>
                                    <th>Status</th>
                                    <th>Manage</th>
                                </tr>
                            </thead>
                            {/* rows */}
                            <tbody>
                                {/* {
                                    users.map((item, idx) => <AdminDeliveryCard key={item._id} idx={idx + 1} item={item}></AdminDeliveryCard>)
                                } */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDeliveryMen;