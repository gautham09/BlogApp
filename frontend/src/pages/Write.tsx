import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../components/BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Write = function(){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate();

    function validate():boolean {
        if(!title.trim() || !content.trim()){
            alert("Fill in Title and Story");
            return false;
        }
        return true;
    }
    async function onPublish(){
        if(!validate())return;
        console.log("before api call");
        const token = localStorage.getItem("token");
        const authHeader = `Bearer ${token}`;
        console.log(`authHeader = ${authHeader}`);
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`, 
                { // Body of the request
                    title: title,
                    content: content
                },
                { // Configuration object
                    headers: {
                        Authorization: authHeader
                    }
                }
            );
    
            console.log(`Response status= ${response.status}`);
            if (response.status === 401) {
                navigate('/signin');
            } else {
                navigate('/blogs');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error response:", error.response);
    
                if (error.response?.status == 401) {
                    navigate('/signin');
                }
            } else {
                console.error("Unknown error:", error);
            }
        }
        console.log("in publish")
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        setTitle(value);
        console.log("Current TextArea Value:", value);
    }

    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        const value = event.target.value;
        setContent(value);
        console.log("Current TextArea Value:", value);
  
    }

    return <div>
        <Appbar publish={onPublish}/>
        <div className="flex justify-center pt-4">
           <div>
                <div className=" max-w-3xl w-full ">
                    <input
                    type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-5xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500" placeholder="Title" 
                    onChange={handleInputChange}
                    required />
                </div>

                <div className="bg-green-200 w-full max-w-3xl">
            
                    <textarea id="story"  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 h-[50vh]" placeholder="Add your story..."
                    onChange={handleContentChange}
                    ></textarea>
                </div>
            </div> 

        </div>
    </div>
}
const Appbar = ({ publish }: { publish: () => void }) => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={"/blogs"} className="flex flex-col justify-center">
            <div className="cursor-pointer flex flex-col justify-center">MEDIUM</div>
        </Link>
        <div className="flex">
            
                <div className="px-5">
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={publish}
                    >Publish</button>
                </div>
        <Avatar name="Gautham" size="big"></Avatar>
        </div>
    </div>
};


