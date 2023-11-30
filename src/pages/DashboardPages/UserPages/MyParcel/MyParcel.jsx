import useParcel from "../../../../hooks/useParcel";


const MyParcel = () => {
    const [parcel] = useParcel();
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
                                    // myOrderList.map((orderItem, idx) => <MyOrderCard key={orderItem._id} idx={idx + 1} handleDelete={handleDelete} orderItem={orderItem}></MyOrderCard>)
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