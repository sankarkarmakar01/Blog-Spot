import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
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
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";

const Comments = () => {
  const [refreshData, setRefreshData] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-all-comment`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/comment/delete/${id}`
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
      <CardContent className="p-4 md:p-6">
        <div className="overflow-x-auto">
          <Table className="min-w-[600px] md:min-w-full">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-left">Blog</TableHead>
                <TableHead className="text-left">Commented By</TableHead>
                <TableHead className="text-left">Comment</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.comments.length > 0 ? (
                data.comments.map((comment) => (
                  <TableRow
                    key={comment._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{comment?.blogid?.title}</TableCell>
                    <TableCell>{comment?.user?.name}</TableCell>
                    <TableCell>{comment?.comment}</TableCell>
                    <TableCell className="flex justify-center gap-3">
                      <Button
                        onClick={() => handleDelete(comment._id)}
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
                  <TableCell colSpan={4} className="text-center py-4">
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

export default Comments;
