import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://swift-parcel-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;