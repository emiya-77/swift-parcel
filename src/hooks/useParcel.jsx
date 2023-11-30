
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useParcel = () => {
    const axiosPublic = useAxiosPublic();

    const { data: parcel = [], isPending: loading, refetch } = useQuery({
        queryKey: ['parcel'],
        queryFn: async () => {
            const res = await axiosPublic.get('/parcel');
            return res.data;
        }
    })


    return [parcel, loading, refetch]
}

export default useParcel;