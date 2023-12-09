import { useEffect, useState } from "react";
import { MdOutlineManageAccounts } from "react-icons/md";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";


const AdminDeliveryCard = ({ item, idx, refresh, setRefresh }) => {
    const axiosPublic = useAxiosPublic();
    const { name, email, phone, parcelDelivered, averageReview } = item || {};
    const [deliveredParcel, setDeliveredParcel] = useState([]);

    useEffect(() => {
        axiosPublic.get(`/parcel-delivered/${email}`)
            .then(res => {
                const filteredParcels = res.data.filter(item => item.status === 'delivered');
                setDeliveredParcel(filteredParcels);
            })
    }, [axiosPublic, email]);
    return (
        <tr>
            <th>
                <label>
                    <h2>{idx}</h2>
                </label>
            </th>
            <td>
                <div>
                    <div className="font-bold">{name}</div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-semibold">{phone}</div>
                </div>
            </td>
            <td>
                <div className="font-semibold">{deliveredParcel.length}</div>
            </td>
            <td>
                <div className="font-semibold">{ }</div>
            </td>
        </tr>
    );
};

export default AdminDeliveryCard;