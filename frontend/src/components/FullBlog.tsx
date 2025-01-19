import { Blog } from "../assets/hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = function({blog}: {blog: Blog | undefined}) {
console.log(`blog = ${blog}`);
return (

<div className=" grid grid-cols-12 w-full px-10 max-w-screen-2xl pt-10">
    <div className=" col-span-8">
        <div className="px-2">

        <div className="text-5xl font-extrabold">
         {blog?.title}
        </div>
        <div className="text-slate-500 pt-2">
            Posted on 2nd Dec
        </div>
        <div className="pt-4">
            {blog?.content}
        </div>
        </div>
    </div>

    <div className=" col-span-4">
        <div className="px-2">
                <div className="text-slate-600 text-lg">

                Author
                </div>
        <div className="flex w-full">
            <div className="flex flex-col justify-center pr-2">
                <Avatar name={blog?.authorName || "Anonymous"} size="small"></Avatar>
            </div>
            <div>
                <div className="text-xl font-bold">
                    {blog?.authorName || "Anonymous"}
                </div>
                <div>
                    Random catch phrase about author's ability to grab user attention
                </div>
            </div>
        </div>
        </div>
    
    </div>
</div>
);
};