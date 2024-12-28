import { useState } from "react";
import BlogsBannerSvg from "../../assets/svg/banner-blogspage.svg";
import BlogCard from "../../components/blogCard/BlogCard";
import DeepContainer from "../../components/container/DeepContainer";
import { useBlogsContext } from "../../context/BlogsContext";
import { Pagination } from "@mui/material";
import PopularBlogCard from "../../components/popularBlogCard/PopularBlogCard";
import { Link } from "react-router-dom";
import useCleanString from "../../hooks/useCleanString";

const BlogsPage = () => {
  const { blogs } = useBlogsContext();
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const pageCount = Math.ceil(blogs?.length / itemsPerPage);
  const displayedBlogs = blogs?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const handleChangePageNumber = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <div>
      <img src={BlogsBannerSvg} className="w-full" />
      <DeepContainer>
        <div className="flex justify-center items-start gap-8 py-10 ">
          <div className="min-w-[300px] w-[300px] bg-white hidden  lg:flex rounded-md flex-col gap-5 shadow-sm border p-5">
            <h3 className="font-semibold text-sm">بلاگ های پربازدید </h3>
            <div className="flex flex-col h-80 gap-2 overflow-y-auto">
              {blogs
                .filter((blog) => blog.rating > 4)
                .map((blog) => (
                  <Link  to={`/blogs/${blog.id}-${useCleanString(blog.title)}`} key={blog.id}>
                    <PopularBlogCard {...blog} />
                  </Link>
                ))}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-10">
              {displayedBlogs?.map((blog) => (
                <div className="w-[300px]">
                  <Link to={`/blogs/${blog.id}-${useCleanString(blog.title)}`} key={blog.id}>
                    <BlogCard {...blog} />
                  </Link>
                </div>
              ))}
            </div>

            {pageCount !== 1 ? (
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChangePageNumber}
                color="primary"
                variant="outlined"
                shape="rounded"
                style={{ direction: "ltr" }}
              />
            ) : (
              null
            )}
          </div>
        </div>
      </DeepContainer>
    </div>
  );
};

export default BlogsPage;
