import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, _id } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are You Sure You want to delete this blog?"
    );
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { blogId: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const tooglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        blogId: _id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <tr className="border-y border-gray-300">
        <th className="px-2 py-4">{index}</th>
        <th className="px-2 py-4">{title}</th>
        <th className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</th>
        <th className="px-2 py-4 max-sm:hidden">
          <p
            className={`${
              blog.isPublished ? "text-green-600" : "text-orange-700"
            }`}
          >
            {blog.isPublished ? "Published" : "UnPublished"}
          </p>
        </th>
        <th className="px-2 py-4 flex text-xs gap-3">
          <button
            onClick={tooglePublish}
            className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
          >
            {blog.isPublished ? "UnPublish" : "Publish"}
          </button>
          <img
            src={assets.cross_icon}
            className="w-8 hover:scale-110 transition-all cursor-pointer"
            alt=""
            onClick={deleteBlog}
          />
        </th>
      </tr>
    </>
  );
};

export default BlogTableItem;
