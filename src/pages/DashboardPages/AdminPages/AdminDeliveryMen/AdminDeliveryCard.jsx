import { MdOutlineManageAccounts } from "react-icons/md";


const AdminDeliveryCard = ({ item, idx, refresh, setRefresh }) => {
    const { name, phone, parcelDelivered, averageReview } = item || {};
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
                <div className="font-semibold">{ }</div>
            </td>
            <td>
                <div className="font-semibold">{ }</div>
            </td>
        </tr>
    );
};

export default AdminDeliveryCard;