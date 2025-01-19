import {useState, useEffect} from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export interface Blog {
    blogId: string,
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
  }
  
  export const useBlog = ({id}:{id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect( function(){
        const token = localStorage.getItem("token");
        const authHeader = `Bearer ${token}`;
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization: `${authHeader}`
            }
        }).then(
            function(response){
                const blogData = response.data;
                const transformedBlog: Blog = {
                    blogId: blogData.id,
                    content: blogData.content,
                    title: blogData.title,
                    publishedDate: blogData.publishedDate || "",
                    authorName: blogData.author?.name || "Anonymous",
                  };
                  setBlog(transformedBlog);
                  setLoading(false);
            }
        )
    }, [id])

    return {loading, blog};
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect( function(){
        const token = localStorage.getItem("token");
        const authHeader = `Bearer ${token}`;
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization: `${authHeader}`
            }
        }).then(
            function(response){
                const transformedBlogs: Blog[] = response.data.blogs.map((blog: any) => ({
                    blogId: blog.id,
                    content: blog.content,
                    title: blog.title,
                    publishedDate: blog.publishedDate || "",
                    authorName: blog.author?.name || "Anonymous",
                  }));
                  setBlogs(transformedBlogs);
                  setLoading(false);
            }
        )
    }, [])

    return {loading, blogs}
}