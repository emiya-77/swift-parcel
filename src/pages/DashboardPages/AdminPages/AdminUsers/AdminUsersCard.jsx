import { MdOutlineUpdate } from "react-icons/md";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AdminUsersCard = ({ item, idx, refresh, setRefresh }) => {
    const axiosSecure = useAxiosSecure();
    const { _id, name, phone, bookedParcelCount, totalAmount, role } = item || {};

    const handleMakeDeliveryMen = (e, id) => {
        const updateInfo = {
            role: "deliveryMan"
        }

        axiosSecure.patch(`/users/change-role/${id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setRefresh(!refresh);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'This user is now a delivery man.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleMakeAdmin = (e, id) => {
        const updateInfo = {
            role: "admin"
        }

        axiosSecure.patch(`/users/change-role/${id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setRefresh(!refresh);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'This user is now an admin.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

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
                <button onClick={e => handleMakeDeliveryMen(e, _id)} disabled={role === 'deliveryMan' && true} className="btn btn-ghost btn-sm border-2 border-orange-200">
                    <MdOutlineUpdate />Make Delivery Men
                </button>
            </td>
            <td>
                <button onClick={e => handleMakeAdmin(e, _id)} disabled={role === 'admin' && true} className="btn btn-ghost btn-sm border-2 border-orange-200">
                    <MdOutlineUpdate />Make Admin
                </button>
            </td>
        </tr>
    );
};

export default AdminUsersCard;