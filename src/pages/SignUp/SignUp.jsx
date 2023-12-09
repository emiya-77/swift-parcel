import { useContext, useState } from 'react';
import { FaEyeSlash, FaEye, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: data.userType,
                            photo: data.photoURL,
                            phone: data.phoneNumber,
                            bookedParcelCount: 0,
                            totalAmount: 0
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })


                    })
                    .catch(error => console.log(error))
            })
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    role: 'user',
                    photo: '',
                    phone: '',
                    bookedParcelCount: 0,
                    totalAmount: 0
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/');
                        }
                    })
                navigate('/');
                toast.success('Logged In Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch(error => {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                console.log(error);
            })
    }


    return (
        <>
            <div className='w-full flex justify-center items-center bg-orange-200 h-screen'>
                <div className='mx-2 lg:mx-0 container relative bg-white lg:w-[1200px] h-[750px] flex flex-col-reverse md:flex-row justify-center rounded-3xl shadow-lg'>
                    <div className='p-0 md:pl-20 w-full md:w-1/3 h-full relative flex justify-center items-center'>
                        <div className='w-full md:absolute'>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center md:items-start'>
                                <input {...register("name", { required: true })} className="input-text" type="text" name="name" placeholder="Name" required />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                                <input {...register("photoURL")} className="input-text" type="text" name="photo" placeholder="Photo URL" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                <input {...register("phoneNumber")} className="input-text" type="text" name="phoneNumber" placeholder="phoneNumber" />
                                {errors.phoneNumber && <span className="text-red-600"> Phone Number is required</span>}
                                <input {...register("email", { required: true })} className="input-text" type="email" name="email" placeholder="E-mail" required />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                                <div className='relative'>
                                    <input {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} className="input-text" type={!showPassword ? "password" : "text"} name="password" placeholder="Password" required />
                                    <span onClick={() => setShowPassword(!showPassword)} className='absolute top-6 md:top-8 text-orange-500 text-2xl right-7 md:right-11 font-semibold cursor-pointer'>
                                        {
                                            !showPassword ? <FaEyeSlash></FaEyeSlash>
                                                : <FaEye></FaEye>
                                        }
                                    </span>
                                </div>
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have at least one Uppercase one lower case, one number and one special character.</p>}
                                <div>
                                    <select {...register("userType", { required: true })} className="input-text">
                                        <option value="" disabled selected>Select User Type</option>
                                        <option value="user">User</option>
                                        <option value="deliveryMan">Delivery Man</option>
                                    </select>
                                    {errors.userType && <span className="text-red-600">User Type is required</span>}
                                </div>
                                <div className='flex'>
                                    <input className="w-[200px] cursor-pointer text-xl font-medium py-4 text-white bg-[#161f26] border-2 border-[#161f26] hover:bg-opacity-0 hover:border-orange-500 hover:text-orange-500 transition duration-200 ease-in-out rounded-full mx-4 my-6 shadow-lg" type="submit" value="Sign Up" />
                                    <button onClick={handleGoogleSignIn} className='w-[65px] h-[65px] cursor-pointer text-xl font-medium py-4 text-white bg-[#161f26] border-2 border-[#161f26] hover:bg-opacity-0 hover:border-orange-500 hover:text-orange-500 transition duration-200 ease-in-out rounded-full m-6 shadow-lg flex justify-center items-center'>
                                        <FaGoogle className='text-2xl hover:text-orange-500'></FaGoogle>
                                    </button>
                                </div>
                            </form>
                            <div className='relative flex justify-center md:justify-start items-center md:flex-none'>
                                <p className='text-sm md:absolute md:ml-7 md:top-2 md:text-base tracking-wider'>Already have an account? <Link to='/login' className="font-medium text-orange-500 opacity-100 underline">Login</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-96 md:w-2/3 md:h-full rounded-3xl flex justify-center items-center overflow-hidden'>
                        <Link to='/'>
                            <img className='w-80 h-80 object-cover' src='/img/logo/swift-parcel.png' alt="dinner" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;