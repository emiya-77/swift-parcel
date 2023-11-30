import { useContext, useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const Login = () => {
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState();
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                e.target.reset();
                navigate(location?.state ? location?.state : '/');
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
                console.log(error.message);
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    role: 'user'
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
            <div className='w-full pt-20 flex justify-center items-center bg-split h-screen'>
                <div className='mx-2 xl:mx-0 container relative bg-white lg:w-[1200px] h-[750px] flex flex-col-reverse md:flex-row justify-center rounded-3xl shadow-lg'>
                    <img className='w-40 md:w-48 absolute top-[270px] md:top-10 left-[76px] md:left-12' src="/img/logo/elysium-light.png" alt="" />
                    <div className='p-0 md:pl-20 w-full md:w-1/3 h-full relative flex justify-center items-center'>
                        <div className='w-full absolute'>
                            <form onSubmit={handleLogin} className='flex flex-col items-center md:items-start'>
                                <input className="input-text" type="email" name="email" placeholder="E-mail" required />
                                <div className='relative'>
                                    <input className="input-text" type={!showPassword ? "password" : "text"} name="password" placeholder="Password" required />
                                    <span onClick={() => setShowPassword(!showPassword)} className='absolute top-6 md:top-8 text-orange-500 text-2xl right-7 md:right-11 font-semibold cursor-pointer'>
                                        {
                                            !showPassword ? <FaEyeSlash></FaEyeSlash>
                                                : <FaEye></FaEye>
                                        }
                                    </span>
                                </div>
                                <div className='flex flex-col md:flex-row justify-start items-center'>
                                    <input className="w-[200px] cursor-pointer text-xl font-medium py-4 text-white bg-[#161f26] border-2 border-[#161f26] hover:bg-opacity-0 hover:border-orange-500 hover:text-orange-500 transition duration-200 ease-in-out rounded-full mx-4 mt-6 md:my-6 shadow-lg" type="submit" value="Login" />
                                    <button onClick={handleGoogleSignIn} className='w-[65px] h-[65px] cursor-pointer text-xl font-medium py-4 text-white bg-[#161f26] border-2 border-[#161f26] hover:bg-opacity-0 hover:border-orange-500 hover:text-orange-500 transition duration-200 ease-in-out rounded-full m-6 shadow-lg flex justify-center items-center'>
                                        <FaGoogle className='text-2xl hover:text-orange-500'></FaGoogle>
                                    </button>
                                </div>
                            </form>
                            <div className='relative flex justify-center md:justify-start items-center md:flex-none'>
                                <p className='text-sm md:absolute md:ml-7 md:top-[160px] md:text-base tracking-wider'>Don&apos;t have an account? <Link to='/signup' className="font-medium text-orange-500 opacity-100 underline">Sign Up</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-96 md:w-2/3 md:h-full rounded-3xl flex justify-center items-center overflow-hidden'>
                        <img className='w-full h-full object-cover' src='/img/food4.jpg' alt="dinner" />
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default Login;