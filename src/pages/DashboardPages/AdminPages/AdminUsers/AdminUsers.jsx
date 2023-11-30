import { useEffect, useState } from "react";
import AdminUsersCard from "./AdminUsersCard";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const AdminUsers = () => {
    const [refresh, setRefresh] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
            })
    }, [refresh, axiosSecure]);

    return (
        <>
            <div className="w-96 mx-auto text-center py-6 mb-6 border-y-[3px] border-orange-200">
                <h1 className="text-4xl">All Users {users.length}</h1>
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
                                    <th>No. of Parcels Booked</th>
                                    <th>Total Amount</th>
                                    <th>Role</th>
                                    <th>Make Delivery Men</th>
                                    <th>Make Admin</th>
                                </tr>
                            </thead>
                            {/* rows */}
                            <tbody>
                                {
                                    users.map((item, idx) => <AdminUsersCard key={item._id} idx={idx + 1} item={item}></AdminUsersCard>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminUsers;