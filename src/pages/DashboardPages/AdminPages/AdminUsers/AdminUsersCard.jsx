import { MdOutlineUpdate } from "react-icons/md";


const AdminUsersCard = ({ item, idx }) => {

    const { name, phone, bookedParcelCount, totalAmount, role } = item || {};

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
                <span className="font-semibold">{bookedParcelCount}</span>
            </td>
            <td>
                <div className="font-semibold">{totalAmount}</div>
            </td>
            <td>
                <div className="font-semibold">{role}</div>
            </td>
            <td>
                <button disabled={role === 'deliveryMan' && true} className="btn btn-ghost btn-sm border-2 border-orange-200">
                    <MdOutlineUpdate />Make Delivery Men
                </button>
            </td>
            <td>
                <button disabled={role === 'admin' && true} className="btn btn-ghost btn-sm border-2 border-orange-200">
                    <MdOutlineUpdate />Make Admin
                </button>
            </td>
        </tr>
    );
};

export default AdminUsersCard;