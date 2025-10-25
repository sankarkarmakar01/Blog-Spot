import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/images/logo-white.png";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteIndex,
  RouteUser,
} from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );

  // Check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="bg-white">
        <div className="flex items-center justify-center">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-auto py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActiveRoute(RouteIndex)}
                className={`transition-all duration-200 ${
                  isActiveRoute(RouteIndex)
                    ? "bg-violet-50 text-violet-700 border-r-2 border-violet-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Link to={RouteIndex} className="flex items-center gap-3">
                  <IoHomeOutline
                    className={`h-5 w-5 ${
                      isActiveRoute(RouteIndex)
                        ? "text-violet-600"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="font-medium">Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {user && user.isLoggedIn ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(RouteBlog)}
                    className={`transition-all duration-200 ${
                      isActiveRoute(RouteBlog)
                        ? "bg-violet-50 text-violet-700 border-r-2 border-violet-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Link to={RouteBlog} className="flex items-center gap-3">
                      <GrBlog
                        className={`h-5 w-5 ${
                          isActiveRoute(RouteBlog)
                            ? "text-violet-600"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="font-medium">Blogs</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(RouteCommentDetails)}
                    className={`transition-all duration-200 ${
                      isActiveRoute(RouteCommentDetails)
                        ? "bg-violet-50 text-violet-700 border-r-2 border-violet-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Link
                      to={RouteCommentDetails}
                      className="flex items-center gap-3"
                    >
                      <FaRegComments
                        className={`h-5 w-5 ${
                          isActiveRoute(RouteCommentDetails)
                            ? "text-violet-600"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="font-medium">Comments</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : null}

            {user && user.isLoggedIn && user.user.role === "admin" ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(RouteCategoryDetails)}
                    className={`transition-all duration-200 ${
                      isActiveRoute(RouteCategoryDetails)
                        ? "bg-violet-50 text-violet-700 border-r-2 border-violet-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Link
                      to={RouteCategoryDetails}
                      className="flex items-center gap-3"
                    >
                      <BiCategoryAlt
                        className={`h-5 w-5 ${
                          isActiveRoute(RouteCategoryDetails)
                            ? "text-violet-600"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="font-medium">Categories</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(RouteUser)}
                    className={`transition-all duration-200 ${
                      isActiveRoute(RouteUser)
                        ? "bg-violet-50 text-violet-700 border-r-2 border-violet-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Link to={RouteUser} className="flex items-center gap-3">
                      <LuUsers
                        className={`h-5 w-5 ${
                          isActiveRoute(RouteUser)
                            ? "text-violet-600"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="font-medium">Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : null}
          </SidebarMenu>
        </SidebarGroup>

        {/* Categories Section */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Categories
          </SidebarGroupLabel>
          <SidebarMenu>
            {categoryData && categoryData.category.length > 0 ? (
              categoryData.category.map((category) => (
                <SidebarMenuItem key={category._id}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(RouteBlogByCategory(category.slug))}
                    className={`transition-all duration-200 ${
                      isActiveRoute(RouteBlogByCategory(category.slug))
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Link
                      to={RouteBlogByCategory(category.slug)}
                      className="flex items-center gap-3"
                    >
                      <GoDot
                        className={`h-4 w-4 ${
                          isActiveRoute(RouteBlogByCategory(category.slug))
                            ? "text-blue-500"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="text-sm truncate">{category.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            ) : (
              <SidebarMenuItem>
                <div className="px-6 py-2">
                  <p className="text-xs text-gray-500 text-center">
                    No categories found
                  </p>
                </div>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
