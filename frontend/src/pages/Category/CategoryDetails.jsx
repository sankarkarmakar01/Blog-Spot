import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";

const CategoryDetails = () => {
  const [refreshData, setRefreshData] = useState(false);
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/category/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data deleted.");
    } else {
      showToast("error", "Data not deleted.");
    }
  };

  if (loading) return <Loading />;

  return (
    <Card className="w-fit overflow-auto">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Category Details</h2>
        <Button className="cursor-pointer" asChild>
          <Link to={RouteAddCategory}>Add Category</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="overflow-x-auto">
          <Table className="min-w-[500px] md:min-w-full">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-left">Category</TableHead>
                <TableHead className="text-left">Slug</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.category.length > 0 ? (
                categoryData.category.map((category) => (
                  <TableRow
                    key={category._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="flex justify-center gap-3">
                      <Button
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white transition-colors"
                        asChild
                      >
                        <Link to={RouteEditCategory(category._id)}>
                          <FiEdit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleDelete(category._id)}
                        variant="outline"
                        className=" cursor-pointer hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                      >
                        <FaRegTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    Data not found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryDetails;
