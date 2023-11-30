import { MdOutlineManageAccounts } from "react-icons/md";


const AdminDeliveryCard = () => {
    return (
        <div>
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
                        <div className="font-bold">{phoneNumber}</div>
                    </div>
                </td>
                <td>
                    <span className="">{deliveryDate}</span>
                </td>
                <td>{deliveryDateReq}</td>
                <td>
                    <div className="font-semibold">{price}</div>
                </td>
                <td>
                    <div className="font-semibold">{status}</div>
                </td>
                <td>
                    <button onClick={openModal} className="btn btn-ghost btn-sm text-3xl rounded-full w-10 h-10">
                        <MdOutlineManageAccounts></MdOutlineManageAccounts>
                    </button>
                </td>
            </tr>
        </div>
    );
};

export default AdminDeliveryCard;