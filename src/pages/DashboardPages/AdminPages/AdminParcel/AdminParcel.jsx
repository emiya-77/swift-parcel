import { useState } from "react";
import useParcel from "../../../../hooks/useParcel";
import AdminParcelCard from "./AdminParcelCard";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const AdminParcel = () => {
    const [parcel] = useParcel();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const axiosSecure = useAxiosSecure();
    const [filteredParcel, setFilteredParcel] = useState([]);

    const handleSearch = () => {
        if (!startDate || !endDate) return;

        const searchQuery = `?startDate=${startDate}&endDate=${endDate}`;

        axiosSecure.get(`/parcels/search-date${searchQuery}`)
            .then(res => {
                console.log(res.data);
                setFilteredParcel(res.data);
            })
    };

    const handleClear = () => {
        setFilteredParcel([]);
        setStartDate("");
        setEndDate("");
    };

    return (
        <>
            <div className="w-96 mx-auto text-center py-6 mb-6 border-y-[3px] border-orange-200">
                <h1 className="text-4xl">All Parcels: {parcel.length}</h1>
            </div>
            <div className="container mx-auto mb-40">
                <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="w-full flex justify-end items-end mb-4 gap-12">
                        <div className="w-32">
                            <label className="block font-semibold">Start Date:</label>
                            <input
                                type="date"
                                className="w-full rounded-md bg-orange-200 p-2"
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)}
                            />
                        </div>
                        <div className="w-32">
                            <label className="block font-semibold">End Date:</label>
                            <input
                                type="date"
                                className="w-full rounded-md bg-orange-200 p-2"
                                value={endDate}
                                onChange={(event) => setEndDate(event.target.value)}
                            />
                        </div>
                        <div>
                            <button className="bg-orange-300 hover:bg-orange-200 font-semibold text-orange-950 px-4 py-2 rounded" onClick={handleSearch}>
                                Search
                            </button>
                            <button className="btn-ghost border-2 border-orange-300 px-4 py-[6px] rounded ml-4 font-semibold" onClick={handleClear}>
                                Clear
                            </button>
                        </div>
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
                                {filteredParcel.length ? filteredParcel.map((item, idx) => (
                                    <AdminParcelCard key={item._id} idx={idx + 1} item={item} />
                                )) : parcel.map((item, idx) => (
                                    <AdminParcelCard key={item._id} idx={idx + 1} item={item} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminParcel;