import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="w-full h-screen pt-16">
            <div className="container h-[800px] mx-auto pt-16 rounded-lg overflow-hidden flex flex-col justify-start items-center gap-4">
                <div className="w-[700px] h-[450px] flex justify-center items-center rounded-lg overflow-hidden">
                    <img className="w-full h-full object-cover" src="/img/404/404_2.gif" alt="page not found" />
                </div>
                <Link to='/'>
                    <button className="btn btn-warning hover:bg-opacity-70 border-none">Back To Home</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;