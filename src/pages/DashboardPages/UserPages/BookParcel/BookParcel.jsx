import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const BookParcel = () => {
    const { user } = useAuth();

    const handleAddItem = e => {
        e.preventDefault();

        const form = e.target;
        const foodName = form.foodName.value;
        const foodImage = form.foodImage.value;
        const foodCategory = form.foodCategory.value;
        const price = form.price.value;
        const addBy = form.addBy.value;
        const madeBy = user?.displayName;
        const foodOrigin = form.foodOrigin.value;
        const shortDescription = form.shortDescription.value;
        const quantity = parseInt(form.quantity.value, 10);
        const orders = 0;

        const newItem = { foodName, foodImage, foodCategory, price, addBy, madeBy, foodOrigin, shortDescription, quantity, orders };
        console.log(newItem);

        fetch("https://elysium-server.vercel.app/add-item", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newItem),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Item Added Successfully",
                        icon: "success",
                        confirmButtonText: "Cool",
                    });
                    form.reset();
                }
            });
    };

    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // 
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    };

    return (
        <div>
            <div className='w-full flex justify-center items-center bg-split h-screen pt-20'>
                <div className='container bg-orange-50 lg:w-[1200px] h-[650px] flex flex-col justify-center items-center rounded-3xl shadow-lg'>
                    <Link className="my-12" to='/'>
                        <img className='w-40 md:w-48' src="/img/logo/elysium-light.png" alt="logo" />
                    </Link>
                    <div className='w-full h-full flex justify-center items-start'>
                        <div className='w-full justify-center items-center'>
                            <form onSubmit={handleAddItem} className='flex flex-col justify-center items-center'>
                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex items-center justify-center">
                                        <input className="input-text" type="text" name="foodName" placeholder="Food Name" required />
                                        <input className="input-text" type="text" name="foodImage" placeholder="Food Image URL" />
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <input className="input-text" type="text" name="foodCategory" placeholder="Food Category" required />
                                        <input className="input-text" type="number" name="quantity" placeholder="Quantity" />
                                    </div>
                                    <div>
                                        <input className="input-text" type="text" name="price" placeholder="Price" required />
                                        <input className="input-text" type="email" name="addBy" placeholder="Add By" value={user?.email} required />
                                    </div>
                                    <div>
                                        <input className="input-text" type="text" name="foodOrigin" placeholder="Food Origin" required />
                                        <input className="input-text" type="text" name="shortDescription" placeholder="Short Description" required />
                                    </div>
                                </div>

                                <input className="w-[200px] cursor-pointer text-xl font-medium py-4 text-white bg-[#161f26] border-2 border-[#161f26] hover:bg-opacity-0 hover:border-orange-500 hover:text-orange-500 transition duration-200 ease-in-out rounded-full mx-4 my-6 shadow-lg" type="submit" value="Add Item" />
                            </form>
                        </div>
                    </div>
                    {/* <div className='w-full h-96 md:w-2/3 md:h-full rounded-3xl flex justify-center items-center overflow-hidden'>
                        <img className='w-full h-full object-cover' src='/img/food3.jpg' alt="dinner" />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default BookParcel;