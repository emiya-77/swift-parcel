import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { displayName, photoURL } = user || {};
    const [profilePicture, setProfilePicture] = useState('');
    console.log(user);

    useEffect(() => {
        if (photoURL) {
            setProfilePicture(photoURL);
        }
    }, [photoURL]);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('user logged out');
            })
            .catch(error => {
                console.log(error);
            })
    }

    const smNavLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        <li><NavLink to='/notification'>Notify</NavLink></li>
        {
            user
                ? <li><Link to='/login'>
                    <button onClick={handleLogOut} className="">Log Out</button>
                </Link></li>
                : <><li><NavLink to='/signup'>signup</NavLink></li>
                    <li><NavLink to='/login'>Login</NavLink></li></>
        }
    </>

    const navLinks = <>
        <li><NavLink className={({ isActive }) => {
            return (
                isActive
                    ? 'nav-list bg-orange-200 bg-opacity-40'
                    : 'nav-list bg-orange-50 bg-opacity-0'
            );
        }} to='/'>Home</NavLink></li>
        <li><NavLink className={({ isActive }) => {
            return (
                isActive
                    ? 'nav-list bg-orange-200 bg-opacity-40'
                    : 'nav-list bg-orange-50 bg-opacity-0'
            );
        }} to='/dashboard'>Dashboard</NavLink></li>
        <li><NavLink className={({ isActive }) => {
            return (
                isActive
                    ? `nav-list bg-orange-200 bg-opacity-40`
                    : 'nav-list bg-orange-50 bg-opacity-0'
            );
        }} to='/notification'>Notify</NavLink></li>
    </>

    const logLinks = <>
        <li><NavLink className={({ isActive }) => {
            return (
                isActive
                    ? 'nav-list bg-white bg-opacity-20'
                    : 'nav-list bg-white bg-opacity-0'
            );
        }} to='/login'>Login</NavLink></li>
        <li><NavLink className={({ isActive }) => {
            return (
                isActive
                    ? 'nav-list bg-white bg-opacity-20'
                    : 'nav-list bg-white bg-opacity-0'
            );
        }} to='/signup'>signup</NavLink></li>
    </>

    const loginLinks = <>
        <div className="ml-4 flex items-center justify-center gap-2">
            <div className="text-2xl dark:font-light font-normal dark:tracking-widest tracking-wider dark:text-white text-black">
                {displayName ? displayName : ''}
            </div>
            {
                user &&
                (<div className="ml-2 dropdown dropdown-bottom dropdown-end">
                    <label tabIndex={0} className="w-12 h-12 flex justify-center items-center bg-white rounded-full overflow-hidden cursor-pointer">
                        <img src={profilePicture} className="w-full h-full object-cover" alt="" />
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="text-center py-2 text-xl font-semibold">{displayName ? displayName : ''}</li>
                        <hr />
                        <li><Link to={`/dashboard`}>Dashboard</Link></li>
                        <li><Link to='/login' onClick={handleLogOut}>Log Out</Link></li>
                    </ul>
                </div>)
            }
        </div>
        <li><Link to='/login'>
            <button onClick={handleLogOut} className="nav-list bg-white bg-opacity-0">Log Out</button>
        </Link></li>
    </>

    return (
        <div className="fixed w-full z-10">
            <nav className="list-none w-full xl:w-full xl:px-16 h-20 md:h-28 mx-auto px-4 lg:px-10 md:px-12 bg-orange-50 dark:bg-orange-950 bg-opacity-70 dark:bg-opacity-80 flex justify-between items-center backdrop-filter backdrop-blur-sm shadow-xl">
                <div className="lg:hidden w-full flex justify-between items-center lg:flex-none">
                    <Link to='/'>
                        <div className="w-[100px]">
                            <img className="w-full h-full object-cover" src="/img/logo/swift-parcel.png" alt="" />
                        </div>
                    </Link>
                    <div className="flex justify-center items-center">
                        {
                            user &&
                            <div className="ml-2 dropdown dropdown-bottom dropdown-end">
                                <label tabIndex={0} className="w-8 h-8 flex justify-center items-center bg-white rounded-full overflow-hidden cursor-pointer">
                                    <img src={profilePicture} className="w-full h-full object-cover" alt="" />
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className="text-center">{displayName ? displayName : ''}</li>
                                    <li><Link to={`/dashboard`}>Dashboard</Link></li>
                                    <li><Link to='/login' onClick={handleLogOut}>Log Out</Link></li>
                                </ul>
                            </div>
                        }
                        <div className="dropdown lg:hidden">
                            <label tabIndex={0} className="lg:hidden">
                                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 dark:text-white text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </label>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content right-0 mt-3 z-[1] p-2 shadow dark:bg-gray-800 bg-white bg-opacity-60 dark:text-white text-black backdrop-filter backdrop-blur rounded-br-3xl rounded-tl-3xl w-52">
                                {smNavLinks}
                            </ul>
                        </div></div>
                </div>
                <Link to='/'>
                    <div className="hidden lg:flex lg:w-[150px] xl:w-[170px]">
                        <img className="w-full h-full object-cover" src="/img/logo/swift-parcel.png" alt="" />
                    </div>
                </Link>
                <div className="hidden lg:flex justify-center items-center gap-4">
                    {navLinks}
                </div>
                <div className="hidden lg:flex justify-center items-center gap-4">
                    {user ? loginLinks : logLinks}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;