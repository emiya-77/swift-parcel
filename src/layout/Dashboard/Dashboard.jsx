import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const Dashboard = () => {
    return (
        <div className="flex">
            <div>
                <Sidebar></Sidebar>
            </div>
            <div className="bg-slate-400 flex-1 px-16 py-12">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;