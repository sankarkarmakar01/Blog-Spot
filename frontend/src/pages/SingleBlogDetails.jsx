import Comment from "@/components/Comment";
import CommentCount from "@/components/CommentCount";
import LikeCount from "@/components/LikeCount";
import Loading from "@/components/Loading";
import RelatedBlog from "@/components/RelatedBlog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { decode } from "entities";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";

const SingleBlogDetails = () => {
  const { blog, category } = useParams();

  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    {
      method: "get",
      credentials: "include",
    },
    [blog, category]
  );

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-red-600">
              <p>Failed to load blog post. Please try again.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Main Content */}
        {data && data.blog && (
          <div className="lg:w-[70%] w-full">
            <Card className="w-full shadow-sm border-0">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                {/* Blog Header */}
                <div className="mb-6">
                  <Badge
                    variant="secondary"
                    className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100"
                  >
                    {data.blog.category?.name}
                  </Badge>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {data.blog.title}
                  </h1>

                  {/* Author Info and Stats */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-y border-gray-100">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-gray-200">
                        <AvatarImage
                          src={data.blog.author.avatar}
                          alt={data.blog.author.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-violet-100 text-violet-600 font-semibold">
                          {data.blog.author.name?.charAt(0)?.toUpperCase() ||
                            "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          {data.blog.author.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {moment(data.blog.createdAt).format("MMM DD, YYYY")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                      <LikeCount props={{ blogid: data.blog._id }} />
                      <CommentCount props={{ blogid: data.blog._id }} />
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                {data.blog.featuredImage && (
                  <div className="mb-6 lg:mb-8">
                    <img
                      src={data.blog.featuredImage}
                      alt={data.blog.title}
                      className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-sm"
                    />
                  </div>
                )}

                {/* Blog Content */}
                <article
                  className="prose prose-gray max-w-none 
                  prose-headings:text-gray-900
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-blockquote:border-l-violet-600 prose-blockquote:bg-gray-50
                  prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                  prose-pre:bg-gray-900 prose-pre:text-gray-100
                  prose-img:rounded-lg prose-img:shadow-sm
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-li:text-gray-700
                  prose-table:border-gray-200
                  prose-th:bg-gray-50
                  prose-td:border-t prose-td:border-gray-100
                "
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: decode(data.blog.blogContent) || "",
                    }}
                  />
                </article>

                {/* Comments Section */}
                <div className="border-t border-gray-100 mt-8 pt-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Comments
                    </h3>
                    <p className="text-gray-600">Join the conversation</p>
                  </div>
                  <Comment props={{ blogid: data.blog._id }} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sidebar - Related Blogs */}
        <div className="lg:w-[30%] w-full">
          <Card className="w-full shadow-sm border-0 sticky top-6">
            <CardContent className="p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Related Blogs
                </h3>
                <p className="text-sm text-gray-600">More from this category</p>
              </div>
              <RelatedBlog props={{ category: category, currentBlog: blog }} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogDetails;
