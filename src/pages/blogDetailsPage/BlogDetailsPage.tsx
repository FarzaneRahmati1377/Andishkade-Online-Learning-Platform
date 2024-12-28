import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../../services/api";
import { IBlog } from "../../types/server";
import DeepContainer from "../../components/container/DeepContainer";

const BlogDetailsPage = () => {
  const [blog, setBlog] = useState<IBlog>();
  const { blogInfo } = useParams();
  const id = blogInfo?.split("-")[0];

  useEffect(() => {
    getBlog(id as string).then((result) => {
      setBlog(result);
    });
  }, [id]);

  return (
    <div className="w-dvw h-full p-5 border-t">
      <DeepContainer>
     
        <div className="flex flex-col gap-5 px-1 lg:px-0">
          <h3 className="font-semibold text-xl">{blog?.title}</h3>
          <div className="flex justify-between  gap-5">
            <div className="w-full h-[300px] lg:h-[500px] rounded-lg">
              <img
                src={blog?.image}
                className="w-full h-full rounded-lg"
              />
            </div>

          </div>

          <p>{blog?.introduction}</p>
          {blog?.body.map((bodyBlog) => (
            <div className="flex flex-col gap-5 ">
              <h3 className="text-lg font-bold">{bodyBlog.title}</h3>
              <div className="flex flex-col gap-5 px-5">
                <p className="">{bodyBlog.caption}</p>
                <ul className="list-inside list-disc flex flex-col gap-3">
                  {bodyBlog.subTitle &&
                    bodyBlog.subTitle.map((subTitle) => (
                      <li className="">
                        <h3 className="inline  text-orange-500">
                          {subTitle.title} :
                        </h3>
                        <p className="inline">{subTitle.caption}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="flex flex-col bg-white gap-3 border shadow-sm p-5 rounded-md">
            <span className="font-bold">نتیجه گیری</span>
            <p>{blog?.conclusion}</p>
          </div>
        </div>
     
      </DeepContainer>
    </div>
  );
};

export default BlogDetailsPage;
