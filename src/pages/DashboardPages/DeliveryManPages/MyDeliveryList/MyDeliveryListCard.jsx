import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const MyDeliveryListCard = ({ item, idx, refresh, setRefresh }) => {
    const axiosSecure = useAxiosSecure();
    const { _id, name, receiverName, phoneNumber, deliveryDateReq, estimatedDeliveryDate, receiverPhone, deliveryAddress, status } = item || {};

    const cancelHandler = () => {
        const updateInfo = {
            status: 'canceled'
        }
        axiosSecure.patch(`/parcel-status/${_id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setRefresh(!refresh);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Delivery is canceled.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const deliverHandler = () => {
        const updateInfo = {
            status: 'delivered'
        }
        axiosSecure.patch(`/parcel-status/${_id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setRefresh(!refresh);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Delivery is canceled.',
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
                    <div className="font-bold">{receiverName}</div>
                </div>
            </td>
            <td>
                <span className="font-semibold">{phoneNumber}</span>
            </td>
            <td>
                <div className="font-semibold">{deliveryDateReq}</div>
            </td>
            <td>
                <div className="font-semibold">{estimatedDeliveryDate}</div>
            </td>
            <td>
                <div className="font-semibold">{receiverPhone}</div>
            </td>
            <td>
                <div className="font-semibold">{deliveryAddress}</div>
            </td>
            <td>
                <button className="btn btn-ghost btn-sm">
                    Location
                </button>
            </td>
            <td>
                <button disabled={status === 'canceled' || status === 'delivered' && true} onClick={cancelHandler} className="btn btn-ghost btn-sm">
                    {status === 'canceled' ? 'Cancel' : 'Cancel'}
                </button>
            </td>
            <td>
                <button disabled={status === 'delivered' || status === 'canceled' && true} onClick={deliverHandler} className="btn btn-ghost btn-sm">
                    {status === 'delivered' ? 'Delivered' : 'Deliver'}
                </button>
            </td>
        </tr>
    );
};

export default MyDeliveryListCard;