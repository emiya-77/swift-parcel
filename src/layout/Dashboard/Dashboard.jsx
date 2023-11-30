import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const Dashboard = () => {
    return (
        <div className="flex h-screen bg-orange-100">
            <div>
                <Sidebar></Sidebar>
            </div>
            <div className="flex-1 px-16 py-12 ml-60">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;