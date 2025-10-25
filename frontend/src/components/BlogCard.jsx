import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from "@/assets/images/user.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";

const BlogCard = ({ props }) => {
  if (!props || !props.author) {
    return null;
  }

  return (
    <Link
      to={RouteBlogDetails(props.category?.slug, props.slug)}
      className="w-full flex justify-center"
    >
      <Card
        className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer 
        h-[350px] sm:h-[380px] lg:h-[400px] 
        w-full sm:w-[300px] lg:w-[320px]"
      >
        <CardContent className="p-4 flex flex-col h-full">
          {/* Author Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={props.author.avatar || usericon} />
              </Avatar>
              <span className="text-sm font-medium text-gray-700 line-clamp-1">
                {props.author.name || "Unknown Author"}
              </span>
            </div>

            {props.author.role === "admin" && (
              <Badge
                variant="outline"
                className="bg-violet-500 text-white py-0.5 px-2 text-xs"
              >
                Admin
              </Badge>
            )}
          </div>

          {/* Image Section */}
          <div className="mt-3 rounded-lg overflow-hidden h-[140px] sm:h-[160px] lg:h-[180px]">
            <img
              src={props.featuredImage}
              alt={props.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="mt-3 flex flex-col justify-between flex-1">
            <p className="flex items-center gap-2 text-xs text-gray-500">
              <FaRegCalendarAlt className="text-sm" />
              <span>{moment(props.createdAt).format("DD-MM-YYYY")}</span>
            </p>
            <h2 className="text-md font-bold line-clamp-2 mt-1">
              {props.title}
            </h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
