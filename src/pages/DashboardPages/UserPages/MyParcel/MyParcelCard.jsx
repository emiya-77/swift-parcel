
import { useRef, useState } from "react";
import { MdOutlineUpdate } from "react-icons/md";
import { MdOutlineCancel, MdPayment, MdReviews } from "react-icons/md";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useParcel from "../../../../hooks/useParcel";

const MyParcelCard = ({ item, idx, refresh, setRefresh }) => {
    const { user } = useAuth();
    const [, refetch] = useParcel();
    const { _id, parcelType, deliveryDateReq, phoneNumber, parcelWeight, receiverName, receiverPhone, deliveryAddress, price, deliveryLat, deliveryLong, estimatedDeliveryDate, deliveryDate, deliveryManId, status } = item || {};

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [cost, setCost] = useState(price);
    const axiosSecure = useAxiosSecure();

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

    const costHandler = e => {
        const weight = parseInt(e.target.value, 10);

        if (isNaN(weight)) {
            setCost(0);
            return;
        }

        if (weight === 1) {
            setCost(50);
        } else if (weight === 2) {
            setCost(100);
        } else if (weight > 2) {
            setCost(150);
        } else {
            setCost(0);
        }
    };


    const onSubmit = async (data) => {
        console.log(data)

        const currentDate = new Date().toISOString().split('T')[0];
        const parcelWeight = parseInt(data.parcelWeight);

        let price;

        if (parcelWeight === 1) {
            price = 50;
        } else if (parcelWeight === 2) {
            price = 100;
        } else if (parcelWeight > 2) {
            price = 150;
        } else {
            console.error('Invalid parcel weight:', parcelWeight);
            return;
        }

        const parcelItem = {
            name: user?.displayName,
            email: user?.email,
            phoneNumber: data.phoneNumber,
            parcelType: data.parcelType,
            parcelWeight: parseInt(data.parcelWeight),
            receiverName: data.receiverName,
            receiverPhone: data.receiverPhone,
            deliveryAddress: data.deliveryAddress,
            deliveryDate: currentDate,
            deliveryDateReq: data.deliveryDateReq,
            deliveryLat: parseFloat(data.lat),
            deliveryLong: parseFloat(data.long),
            price: parseFloat(price),
            status: status
        }
        const parcelItemRes = await axiosSecure.put(`/parcel/${_id}`, parcelItem);
        console.log('parcelItems:', parcelItemRes)
        if (parcelItemRes.data.modifiedCount > 0) {
            // show success popup
            reset();
            setCost(0);
            setRefresh(!refresh);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Your parcel has been updated.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const onCancelHandler = (e, id) => {
        const itemInfo = {
            status: 'canceled'
        }
        if (status === 'pending') {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, cancel it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/cancel-parcel/${id}`, itemInfo)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.modifiedCount > 0) {
                                setRefresh(!refresh);
                                Swal.fire({
                                    title: "Canceled!",
                                    text: "Your parcel booking has been canceled",
                                    icon: "success"
                                });
                            }
                        })

                }
            });
        }
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
                    <div className="font-bold">{parcelType}</div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{ }</div>
                </div>
            </td>
            <td>
                <span className="">{deliveryDate}</span>
            </td>
            <td>{deliveryDateReq}</td>
            <td>
                <div className="font-semibold">{ }</div>
            </td>
            <td>
                <div className="font-semibold">{status}</div>
            </td>
            <td className='flex flex-col items-start justify-center gap-1'>
                <button onClick={openModal} disabled={status !== 'pending' && true} className="btn btn-ghost btn-xs">
                    <MdOutlineUpdate />Update
                </button>
                <button onClick={(e) => onCancelHandler(e, _id)} disabled={status !== 'pending' && true} className="btn btn-ghost btn-xs">
                    <MdOutlineCancel />Cancel
                </button>
            </td>
            <td>
                <button disabled={status !== 'delivered' && true} className="btn btn-ghost btn-sm">
                    <MdReviews />Review
                </button>
            </td>
            <td>
                <button disabled={status !== 'delivered' && false} className="btn btn-ghost btn-sm border-2 border-orange-200">
                    <MdPayment />Pay
                </button>
            </td>
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="rounded-lg bg-orange-50 py-4 px-8">
                    <h2 className="text-center text-4xl my-10">Update Item</h2>
                    <div className="modal-action">
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                            <div className="flex flex-col justify-center items-center">
                                <div className="flex items-center justify-center">
                                    <input defaultValue={user?.displayName} readOnly className="input-text" type="text" name="name" placeholder="Name" required />
                                    <input defaultValue={user?.email} readOnly className="input-text" type="text" name="foodImage" placeholder="Food Image URL" />
                                </div>
                                <div className="flex items-center justify-center">
                                    <input {...register('phoneNumber', { required: true, pattern: /^[0-9]+$/ })} defaultValue={phoneNumber} className="input-text" type="text" name="phoneNumber" placeholder="Phone Number" required />
                                    {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
                                    <input {...register('parcelType', { required: true })} defaultValue={parcelType} className="input-text" type="text" name="parcelType" placeholder="Parcel Type" />
                                </div>
                                <div>
                                    <input onInput={costHandler} {...register('parcelWeight', { required: true, type: 'number' })} defaultValue={parcelWeight} className="input-text" type="number" name="parcelWeight" placeholder="Parcel Weight" required />
                                    {errors.parcelWeight && <p className="error-message">{errors.parcelWeight.message}</p>}
                                    <input {...register('receiverName', { required: true })} defaultValue={receiverName} className="input-text" type="text" name="receiverName" placeholder="Receiver's Name" required />
                                </div>
                                <div>
                                    <input {...register('receiverPhone', { required: true, pattern: /^[0-9]+$/ })} defaultValue={receiverPhone} className="input-text" type="text" name="receiverPhone" placeholder="Receiver's Phone Number" required />
                                    {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
                                    <input {...register('deliveryAddress', { required: true })} defaultValue={deliveryAddress} className="input-text" type="text" name="deliveryAddress" placeholder="Parcel Delivery Address" required />
                                </div>
                                <div>
                                    <input {...register('deliveryDateReq', { required: true })} defaultValue={deliveryDateReq} className="input-text" type="date" name="deliveryDateReq" placeholder="Requested Delivery Date" required />
                                    <input {...register('price', { required: true })} defaultValue={cost} readOnly className="input-text" type="text" name="price" placeholder="price" required />
                                </div>
                                <div>
                                    <input {...register('lat', { valueAsNumber: true })} defaultValue={deliveryLat} className="input-text" type="number" name="lat" placeholder="Latitude" />
                                    <input {...register('long', { valueAsNumber: true })} defaultValue={deliveryLong} className="input-text" type="number" name="long" placeholder="Longitude" required />
                                </div>
                            </div>

                            <div className="flex justify-center items-center gap-4">
                                <input onClick={closeModal} className="w-[200px] cursor-pointer text-xl font-medium py-4 text-white bg-[#161f26] border-2 border-[#161f26] hover:bg-opacity-0 hover:border-orange-500 hover:text-orange-500 transition duration-200 ease-in-out rounded-full mx-4 my-6 shadow-lg" type="submit" value="Book" />
                                <input onClick={closeModal} className="w-[200px] cursor-pointer text-center text-xl font-medium py-4 text-white bg-[#161f26] border-2 border-[#161f26] hover:bg-opacity-0 hover:border-orange-500 hover:text-orange-500 transition duration-200 ease-in-out rounded-full mx-4 my-6 shadow-lg" value="Cancel" />
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </tr>
    );
};

export default MyParcelCard;