

import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdCloudUpload, MdUpdate } from 'react-icons/md';
import useAuth from '../../../../hooks/useAuth';
import MyWishListCard from './MyWishListCard';

const MyProfile = () => {
    const { user, updateUserProfile } = useAuth();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            // Make API request to update user profile
            const response = await axios.put('/api/update-profile', data);

            // Update user information in the authentication context
            updateUserProfile(response.data);

            Swal.fire({
                icon: 'success',
                title: 'Profile updated successfully!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops... Something went wrong!',
                text: 'Unable to update profile.',
            });
        }
    };

    const onFileChange = async (e) => {
        const file = e.target.files[0];

        // Perform file upload to ImgBB
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Make API request to ImgBB for image hosting
            const imgbbResponse = await axios.post('https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY', formData);

            // Extract the hosted image URL from ImgBB response
            const imageUrl = imgbbResponse.data.data.url;

            // Update user profile picture in the database
            const response = await axios.put('/api/update-profile-picture', { profilePicture: imageUrl });

            // Update user information in the authentication context
            updateUserProfile(response.data);

            Swal.fire({
                icon: 'success',
                title: 'Profile picture uploaded successfully!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops... Something went wrong!',
                text: 'Unable to upload profile picture.',
            });
        }
    };

    return (
        <div className="container mx-auto mt-8 p-4">
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>

            <div className="flex items-center mb-4">
                <img
                    src={user?.photoURL || 'default-profile-picture.jpg'} // Replace 'default-profile-picture.jpg' with your default profile picture
                    alt="Profile"
                    className="rounded-full h-16 w-16 object-cover mr-4"
                />
                <div>
                    <label htmlFor="profilePicture" className="cursor-pointer">
                        <MdCloudUpload className="text-orange-400 mr-2" />
                        Upload Profile Picture
                    </label>
                    <input
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        accept="image/*"
                        className="hidden"
                        onChange={onFileChange}
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        defaultValue={user?.username}
                        {...register('username')}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Add more input fields for other user information */}

                <button type="submit" className="bg-orange-300 text-white py-2 px-4 rounded">
                    Update Profile
                </button>
            </form>
            <div className='my-20'>
                <div className='font-semibold text-3xl mb-8 tracking-wider'>
                    My Wish List
                </div>
                <MyWishListCard></MyWishListCard>
            </div>
        </div>
    );
};

export default MyProfile;
