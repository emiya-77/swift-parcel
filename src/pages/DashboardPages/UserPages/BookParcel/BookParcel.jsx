import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useEffect, useRef, useState } from "react";


const BookParcel = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [cost, setCost] = useState(0);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

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
            status: 'Pending'
        }
        const parcelItemRes = await axiosSecure.post('/parcel', parcelItem);
        console.log('parcelItems:', parcelItemRes)
        if (parcelItemRes.data.insertedId) {
            // show success popup
            reset();
            setCost(0);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Parcel is added for booking.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <div className='container mx-auto bg-orange-50 lg:w-[1200px] min-h-[650px] flex flex-col justify-center items-center rounded-3xl shadow-lg'>
                <Link className="my-6" to='/'>
                    <img className='w-40 md:w-48' src="/img/logo/swift-parcel.png" alt="logo" />
                </Link>
                <div className='w-full h-full flex justify-center items-start'>
                    <div className='w-full justify-center items-center'>
                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                            <div className="flex flex-col justify-center items-center">
                                <div className="flex items-center justify-center">
                                    <input defaultValue={user?.displayName} readOnly className="input-text" type="text" name="name" placeholder="Name" required />
                                    <input defaultValue={user?.email} readOnly className="input-text" type="text" name="foodImage" placeholder="Food Image URL" />
                                </div>
                                <div className="flex items-center justify-center">
                                    <input {...register('phoneNumber', { required: true, pattern: /^[0-9]+$/ })} className="input-text" type="text" name="phoneNumber" placeholder="Phone Number" required />
                                    {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
                                    <input {...register('parcelType', { required: true })} className="input-text" type="text" name="parcelType" placeholder="Parcel Type" />
                                </div>
                                <div>
                                    <input onInput={costHandler} {...register('parcelWeight', { required: true, type: 'number' })} className="input-text" type="number" name="parcelWeight" placeholder="Parcel Weight" required />
                                    {errors.parcelWeight && <p className="error-message">{errors.parcelWeight.message}</p>}
                                    <input {...register('receiverName', { required: true })} className="input-text" type="text" name="receiverName" placeholder="Receiver's Name" required />
                                </div>
                                <div>
                                    <input {...register('receiverPhone', { required: true, pattern: /^[0-9]+$/ })} className="input-text" type="text" name="receiverPhone" placeholder="Receiver's Phone Number" required />
                                    {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
                                    <input {...register('deliveryAddress', { required: true })} className="input-text" type="text" name="deliveryAddress" placeholder="Parcel Delivery Address" required />
                                </div>
                                <div>
                                    <input {...register('deliveryDateReq', { required: true })} className="input-text" type="date" name="deliveryDateReq" placeholder="Requested Delivery Date" required />
                                    <input {...register('price', { required: true })} value={cost} className="input-text" type="text" name="price" placeholder="price" required />
                                </div>
                                <div>
                                    <input {...register('lat', { valueAsNumber: true })} className="input-text" type="number" name="lat" placeholder="Latitude" />
                                    <input {...register('long', { valueAsNumber: true })} className="input-text" type="number" name="long" placeholder="Longitude" required />
                                </div>
                            </div>

                            <input className="w-[200px] cursor-pointer text-xl font-medium py-4 text-white bg-[#161f26] border-2 border-[#161f26] hover:bg-opacity-0 hover:border-orange-500 hover:text-orange-500 transition duration-200 ease-in-out rounded-full mx-4 my-6 shadow-lg" type="submit" value="Book" />
                        </form>
                    </div>
                </div>
                {/* <div className='w-full h-96 md:w-2/3 md:h-full rounded-3xl flex justify-center items-center overflow-hidden'>
                        <img className='w-full h-full object-cover' src='/img/food3.jpg' alt="dinner" />
                    </div> */}
            </div>
        </div>
    );
};

export default BookParcel;