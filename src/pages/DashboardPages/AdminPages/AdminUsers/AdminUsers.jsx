import { useEffect, useState } from "react";
import AdminUsersCard from "./AdminUsersCard";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const AdminUsers = () => {
    const [refresh, setRefresh] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
            })
    }, [refresh, axiosSecure]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(users.length / usersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="w-96 mx-auto text-center py-6 mb-6 border-y-[3px] border-orange-200">
                <h1 className="text-4xl">All Users: {users.length}</h1>
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
                                    currentUsers.map((item, idx) => <AdminUsersCard key={item._id} idx={idx + 1} refresh={refresh} setRefresh={setRefresh} item={item}></AdminUsersCard>)
                                }
                            </tbody>
                        </table>
                        {/* Pagination */}
                        <ul className="pagination flex">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button onClick={prevPage} className="page-link btn btn-ghost">
                                    Previous
                                </button>
                            </li>
                            {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active border-2 border-orange-200 rounded-lg' : ''}`}>
                                    <button onClick={() => paginate(index + 1)} className="page-link btn btn-ghost">
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button onClick={nextPage} className="page-link btn btn-ghost">
                                    Next
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminUsers;