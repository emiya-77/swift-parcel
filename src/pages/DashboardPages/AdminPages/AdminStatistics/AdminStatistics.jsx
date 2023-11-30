// import Chart from 'react-apexcharts';

const AdminStatistics = () => {
    // // Dummy data for demonstration purposes
    // const bookingData = {
    //     labels: ['2023-11-01', '2023-11-02', '2023-11-03', '2023-11-04', '2023-11-05'],
    //     series: [
    //         { name: 'Bookings', data: [10, 15, 8, 12, 18] },
    //         { name: 'Deliveries', data: [8, 12, 6, 10, 15] },
    //     ],
    // };

    // const barChartOptions = {
    //     xaxis: {
    //         categories: bookingData.labels,
    //     },
    //     title: {
    //         text: 'Bookings by Date',
    //     },
    // };

    // const lineChartOptions = {
    //     xaxis: {
    //         categories: bookingData.labels,
    //     },
    //     title: {
    //         text: 'Booked vs Delivered Parcels',
    //     },
    // };

    return (
        <div></div>
        // <div className="flex">
        //     {/* Sidebar with admin routes can be added here */}
        //     <div className="w-1/4 bg-gray-200 p-4">
        //         {/* Admin sidebar content */}
        //         {/* Add your admin routes here */}
        //     </div>
        //     <div className="w-3/4 p-4">
        //         <div className="mb-8">
        //             {/* Bar chart for bookings by date */}
        //             <Chart options={barChartOptions} series={bookingData.series.slice(0, 1)} type="bar" height={300} />
        //         </div>
        //         <div>
        //             {/* Line chart for booked vs delivered parcels */}
        //             <Chart options={lineChartOptions} series={bookingData.series} type="line" height={300} />
        //         </div>
        //     </div>
        // </div>
    );
};

export default AdminStatistics;
