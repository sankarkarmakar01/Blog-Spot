import React, { useState } from "react";
import logo from "@/assets/images/logo-white.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import {
  RouteBlogAdd,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
} from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/images/user.png";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from "./ui/sidebar";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b px-5 flex justify-between items-center z-50">
      {/* Left: Logo + Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-1 hover:bg-gray-100 rounded"
          type="button"
        >
          <AiOutlineMenu size={22} />
        </button>
        <Link to={RouteIndex}>
          <img src={logo} className="w-28 sm:w-32 md:w-36 object-contain" />
        </Link>
      </div>

      {/* Middle: SearchBox */}
      <div className="hidden md:block w-[450px] lg:w-[500px]">
        <SearchBox />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Toggle */}
        <button
          onClick={toggleSearch}
          type="button"
          className="md:hidden p-1 hover:bg-gray-100 rounded"
        >
          <IoMdSearch size={24} />
        </button>

        {/* Auth Buttons */}
        {!user.isLoggedIn ? (
          <Button asChild className="rounded-full px-5">
            <Link to={RouteSignIn}>
              <MdLogin size={18} className="mr-1" />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer h-9 w-9">
                <AvatarImage src={user.user.avatar || usericon} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>
                <p className="font-medium">{user.user.name}</p>
                <p className="text-sm text-gray-500">{user.user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={RouteProfile} className="flex items-center gap-2">
                  <FaRegUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={RouteBlogAdd} className="flex items-center gap-2">
                  <FaPlus />
                  Create Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 flex items-center gap-2"
              >
                <IoLogOutOutline />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Mobile Search Box */}
      {showSearch && (
        <div className="absolute top-16 left-0 w-full bg-white p-4 md:hidden shadow-md border-b animate-slide-down">
          <SearchBox />
        </div>
      )}
    </header>
  );
};

export default Topbar;
