import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  blogId: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  blogId,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  const navigate = useNavigate();
  function navigateToBlog(blogId: string){
    navigate(`/blog/${blogId}`);
  }

  return (
    <div className="border-b border-slate-200 py-2 cursor-pointer" onClick={()=>navigateToBlog(blogId)}>
      <div className="flex">
        <Avatar name={authorName} />

        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
          {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2">
          <Circle />
        </div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
          {publishedDate}
        </div>
      </div>

      <div className="text-xl font-semibold pt-2">{title}</div>

      <div className="text-md font-thin">
        {content.slice(0, 100)} + {"..."}
      </div>

      <div className="text-sm font-thin text-slate-500 pt-4">
        {`${Math.ceil(content.length / 100)} minute(s) read`}
      </div>
    </div>
  );
};

function Circle() {
  return <div className="w-1 h-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size = 'small' }: { name: string , size?: string}) {
  const sizeClass = size === 'big' ? 'w-10 h-10' : 'w-6 h-6';
  const textClass = size === 'big' ? 'text-md' : 'text-xs';
  return (
    <div className ={`relative inline-flex items-center justify-center ${sizeClass} overflow-hidden bg-gray-600 rounded-full`}>
      <span className={`${textClass} font-medium text-gray-300 `}>{name[0].toLocaleUpperCase()}</span>
    </div>
  );
}
