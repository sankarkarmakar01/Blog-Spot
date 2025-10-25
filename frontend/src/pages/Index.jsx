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
      <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4">
        <p className="text-red-500 font-medium text-xl">Error loading blogs</p>
        <p className="text-gray-500 text-sm">
          {error.message || "Something went wrong. Please try again."}
        </p>
      </div>
    );
  }

  if (!blogData?.blog || blogData.blog.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-center">
        <p className="text-gray-500 text-lg">No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
      {blogData.blog.map((blog) => (
        <BlogCard key={blog._id} props={blog} />
      ))}
    </div>
  );
};

export default Index;
