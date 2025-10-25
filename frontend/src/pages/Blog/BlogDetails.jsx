import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteBlogAdd, RouteBlogEdit } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import Loading from "@/components/Loading";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import moment from "moment";

const BlogDetails = () => {
  const [refreshData, setRefreshData] = useState(false);
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-all`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await deleteData(
          `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`
        );
        if (response) {
          setRefreshData(!refreshData);
          showToast("success", "Blog deleted successfully");
        } else {
          showToast("error", "Failed to delete blog");
        }
      } catch (error) {
        showToast("error", "Error deleting blog");
      }
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p>Failed to load blogs. Please try again.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border-0">
        <CardHeader className="pb-4 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Blog Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {blogData?.blog
                  ? `Total ${blogData.blog.length} blog${
                      blogData.blog.length !== 1 ? "s" : ""
                    }`
                  : "Manage your blog posts"}
              </p>
            </div>
            <Button
              className="cursor-pointer bg-violet-600 hover:bg-violet-700 text-white w-full sm:w-auto justify-center"
              asChild
            >
              <Link to={RouteBlogAdd} className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Add New Blog</span>
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[800px] lg:min-w-full">
              <Table>
                <TableHeader className="bg-gray-50/80">
                  <TableRow>
                    <TableHead className="font-semibold text-gray-900 py-4 whitespace-nowrap px-4">
                      Author
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900 py-4 whitespace-nowrap px-4 hidden md:table-cell">
                      Category
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900 py-4 whitespace-nowrap px-4 min-w-[200px]">
                      Title
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900 py-4 whitespace-nowrap px-4 hidden lg:table-cell">
                      Slug
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900 py-4 whitespace-nowrap px-4 hidden sm:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900 py-4 whitespace-nowrap px-4 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogData && blogData.blog.length > 0 ? (
                    blogData.blog.map((blog) => (
                      <TableRow
                        key={blog._id}
                        className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                      >
                        <TableCell className="py-4 whitespace-nowrap px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                              {blog?.author?.avatar ? (
                                <img
                                  src={blog?.author?.avatar}
                                  alt="LOGO"
                                  className="h-auto w-fit"
                                />
                              ) : (
                                blog?.author?.name?.charAt(0)?.toUpperCase() ||
                                "U"
                              )}
                            </div>
                            <div className="min-w-0">
                              <span className="font-medium text-gray-900 truncate block text-sm">
                                {blog?.author?.name}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className=" py-4 whitespace-nowrap px-4 hidden md:table-cell">
                          <span className="w-full inline-flex justify-center items-center px-2.5  py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800 max-w-[120px] truncate">
                            {blog?.category?.name}
                          </span>
                        </TableCell>

                        <TableCell className="py-4 px-4">
                          <div className="max-w-[200px] lg:max-w-xs">
                            <p
                              className="font-medium text-gray-900 truncate text-sm"
                              title={blog?.title}
                            >
                              {blog?.title}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 whitespace-nowrap px-4 hidden lg:table-cell">
                          <code className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded truncate block max-w-[150px]">
                            {blog?.slug}
                          </code>
                        </TableCell>
                        <TableCell className="py-4 whitespace-nowrap px-4 hidden sm:table-cell">
                          <div className="text-sm text-gray-600">
                            {moment(blog?.createdAt).format("DD MMM YYYY")}
                          </div>
                        </TableCell>
                        <TableCell className="py-4 whitespace-nowrap px-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9 w-9 p-0 hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-all cursor-pointer flex-shrink-0"
                              asChild
                            >
                              <Link to={RouteBlogEdit(blog._id)}>
                                <FiEdit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              onClick={() => handleDelete(blog._id)}
                              variant="outline"
                              size="sm"
                              className="h-9 w-9 p-0 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all cursor-pointer flex-shrink-0"
                            >
                              <FaRegTrashAlt className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              No blogs found
                            </h3>
                            <p className="text-gray-600 mt-1">
                              Get started by creating your first blog post.
                            </p>
                          </div>
                          <Button asChild className="mt-2">
                            <Link to={RouteBlogAdd}>Create Blog</Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
