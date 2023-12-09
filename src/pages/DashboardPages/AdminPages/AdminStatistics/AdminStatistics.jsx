import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';

const AdminStatistics = () => {
    const [rawData, setRawData] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/bookings-by-date')
            .then(res => {
                setRawData(res.data);
            })
    }, [axiosPublic]);

    const bookingData = {
        labels: rawData.map(entry => entry._id),
        series: [{
            name: 'Bookings',
            data: rawData.map(entry => entry.count),
        }],
    };

    console.log(bookingData);

    const barChartOptions = {
        xaxis: {
            categories: bookingData.labels,
        },
        title: {
            text: 'Bookings by Date',
        },
    };

    return (
        <div className="flex">
            <div className="w-3/4 p-4">
                <div className="mb-8">
                    <Chart options={barChartOptions} series={bookingData.series.splice(0, 1)} type="bar" height={300} />
                </div>
            </div>
        </div>
    );
};

export default AdminStatistics;
