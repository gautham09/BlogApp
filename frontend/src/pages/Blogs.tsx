import { useBlogs } from "../assets/hooks";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    if(loading){
        return <div>
            <div>
        <Appbar></Appbar>
    <div className="flex justify-center">
      <div className="max-w-xl">
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
        <BlogSkeleton/>
      </div>
    </div>
    </div>
        </div>
    }

  return (
    <div>
        <Appbar></Appbar>
    <div className="flex justify-center">
      <div className="max-w-xl">
        {blogs.map(blog=>  <BlogCard
        key={blog.blogId}
          blogId = {blog.blogId}
          authorName={blog.authorName}
          publishedDate={blog.publishedDate}
          content={blog.content}
          title={blog.title}
        ></BlogCard>)}
      </div>
    </div>
    </div>
  );
};
