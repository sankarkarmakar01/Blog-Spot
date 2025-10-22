import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";

const Index = () => {
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/blogs`, {
    method: "get",
    credentials: "include",
  });

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">
          Error loading blogs: {error.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  if (!blogData?.blog || blogData.blog.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 w-full place-items-center">
      {blogData.blog.map((blog) => (
        <BlogCard key={blog._id} props={blog} />
      ))}
    </div>
  );
};

export default Index;
