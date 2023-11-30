import { HiMenuAlt3, HiOutlineBookOpen } from 'react-icons/hi';
import { AiOutlineUser, AiOutlineHome, AiOutlineBarChart, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import useAdmin from '../../hooks/useAdmin';

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [isAdmin] = useAdmin();

    const adminMenus = [
        { name: 'Statistics', link: 'statistics', icon: AiOutlineBarChart },
        { name: 'All Parcels', link: 'all-parcel', icon: AiOutlineShoppingCart },
        { name: 'All Users', link: 'all-user', icon: AiOutlineUser },
        { name: 'All Delivery Men', link: 'all-delivery', icon: HiOutlineBookOpen }
    ]

    const userMenus = [
        { name: 'Home', link: 'user-home', icon: AiOutlineHome },
        { name: 'Book a Parcel', link: 'book-parcel', icon: HiOutlineBookOpen },
        { name: 'My Parcels', link: 'my-parcel', icon: AiOutlineShoppingCart },
        { name: 'My Profile', link: 'my-profile', icon: AiOutlineUser }
    ]

    return (
        <section className='flex gap-6 fixed'>
            <div className={`bg-orange-50 dark:bg-[#ba721b] dark:text-white min-h-screen ${open ? 'w-72' : 'w-16'} duration-700 text-black px-3`}>
                <div className={`py-3 flex ${open ? 'justify-between' : 'justify-center'}`}>
                    <Link className='h-[60px] flex items-center' to='/'>
                        <img className={`${!open && 'hidden'} w-[100px] md:w-[150px]`} src='/img/logo/swift-parcel.png' alt="" />
                    </Link>
                    <HiMenuAlt3 size={26} onClick={() => setOpen(!open)} className='cursor-pointer'></HiMenuAlt3>
                </div>
                <div className='mt-4 flex flex-col gap-4 relative'>
                    {
                        !isAdmin
                            ? (adminMenus?.map((menu, i) => (
                                <Link className={`${menu?.margin ? 'mt-5' : menu?.marginBot ? 'mb-5' : ''} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-[#eec38e] rounded-md`} to={menu?.link} key={i}>
                                    <div>
                                        {React.createElement(menu?.icon, { size: '24' })}
                                    </div>
                                    <h2 style={{
                                        transitionDelay: `${i + 3}00ms`
                                    }} className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}</h2>
                                    <h2 className={`${open && 'hidden'} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
                                        {menu?.name}
                                    </h2>
                                </Link>)))
                            : (userMenus?.map((menu, i) => (
                                <Link className={`${menu?.margin ? 'mt-5' : menu?.marginBot ? 'mb-5' : ''} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-[#eec38e] rounded-md`} to={menu?.link} key={i}>
                                    <div>
                                        {React.createElement(menu?.icon, { size: '24' })}
                                    </div>
                                    <h2 style={{
                                        transitionDelay: `${i + 3}00ms`
                                    }} className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}</h2>
                                    <h2 className={`${open && 'hidden'} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
                                        {menu?.name}
                                    </h2>
                                </Link>)))
                    }
                </div>
            </div>
            {/* <div className='m-3 text-xl text-gray-900 font-semibold'>
                ELYSIUM
            </div> */}
        </section>
    );
};

export default Sidebar;