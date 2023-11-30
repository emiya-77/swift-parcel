import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";


const Banner = () => {
    const [query, setQuery] = useState("");
    return (
        <div className="hero min-h-[600px]" style={{ backgroundImage: 'url(/img/home_bg1.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="flex flex-col justify-center items-center gap-8">
                    <div className="relative">
                        <AiOutlineSearch className="absolute top-4 left-6" size={35} color='#c39e73' opacity={.8}></AiOutlineSearch>
                        <input value={query} onChange={e => setQuery(e.target.value)} type="text" name="search" placeholder="Search" className="w-full md:w-[600px] h-[64px] pl-20 md:pl-18 text-2xl tracking-wider font-light bg-white rounded-full focus:outline-none border-none" />
                    </div>
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Swift Parcel Hub</h1>
                        <p className="mb-5">Effortless Management for Seamless Deliveries</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;