import { useBlog } from "../assets/hooks";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { useParams } from "react-router-dom";
function Blog(){
    const {id} = useParams();
    const {loading, blog} = useBlog({id: id || ""});
    if(loading) return <div><Appbar></Appbar><div>Loading</div></div>
    return <div >
        <Appbar/>
        <FullBlog blog={blog}/>
    </div>
}

export default Blog;