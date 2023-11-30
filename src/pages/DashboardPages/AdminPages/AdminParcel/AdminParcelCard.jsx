
import { useEffect, useRef, useState } from "react";
import { MdOutlineManageAccounts } from "react-icons/md";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminParcelCard = ({ item, idx }) => {
    const axiosSecure = useAxiosSecure();
    const [deliveryMen, setDeliveryMen] = useState([]);

    const { _id, name, phoneNumber, deliveryDate, deliveryDateReq, price, status } = item || '';

    useEffect(() => {
        axiosSecure.get('/users/delivery-man')
            .then(res => {
                setDeliveryMen(res.data);
            })
    }, [axiosSecure]);

    const modalRef = useRef();

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    }


    const handleManage = (e, id) => {
        e.preventDefault();
        const form = e.target;
        const selectedDeliveryman = form.deliveryMan.value;
        const estimatedDeliveryDate = form.estimatedDeliveryDate.value;

        console.log(selectedDeliveryman, estimatedDeliveryDate);

        form.reset();
        if (!selectedDeliveryman || !estimatedDeliveryDate) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `You need to select from both fields`,
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            const item = {
                status: 'On The Way',
                deliveryManId: selectedDeliveryman,
                estimatedDeliveryDate: estimatedDeliveryDate

            }
            axiosSecure.patch(`parcel/${id}`, item)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `$Delivery Man is assigned to this delivery.`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
    }

    return (
        <>
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
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="rounded-lg bg-orange-50 py-4 px-8">
                    <h2 className="text-center text-4xl my-10">Update Item</h2>
                    <div className="modal-action">
                        <form onSubmit={e => handleManage(e, _id)} method="dialog" className="flex flex-col justify-center items-center">
                            <div className="flex flex-col justify-center items-center">
                                <div className="flex items-center justify-center">
                                    <div>
                                        <select className="input-text" id="deliverymen" name="deliveryMan">
                                            <option value="">Select a Deliveryman</option>
                                            {deliveryMen.map(deliveryman => (
                                                <option key={deliveryman._id} value={deliveryman._id}>
                                                    {deliveryman.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <input className="input-text"
                                            type="date"
                                            id="deliveryDate"
                                            name="estimatedDeliveryDate"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="my-10 flex justify-center items-center gap-16">
                                <button onClick={closeModal} className="bg-orange-300 cursor-pointer rounded-lg bg-opacity-60 hover:bg-opacity-80 px-14 py-4 border-none flex justify-center items-center">
                                    <input className="text-[22px]" type="submit" value="Assign" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default AdminParcelCard;