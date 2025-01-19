import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
    return <div className= "border-b flex justify-between px-10 py-4">
        <Link to={"/blogs"} className="flex flex-col justify-center">
            <div className="cursor-pointer flex flex-col justify-center">MEDIUM</div>
        </Link>
        <div className="flex">
            <Link to={"/write"}>
                <div className="px-5">
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Write</button>
                </div>
            </Link>
        <Avatar name="Gautham" size="big"></Avatar>
        </div>
    </div>
};
