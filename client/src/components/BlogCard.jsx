import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { image, title, category, description, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Blog Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </div>

      {/* Blog Content */}
      <div className="p-6">
        {/* Category Tag */}
        <div className="inline-block px-3 py-1 bg-purple-100 text-primary text-sm font-medium rounded-full mb-4">
          {category}
        </div>

        {/* Blog Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Blog Description */}
        <p
          className="text-gray-600 text-sm leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
