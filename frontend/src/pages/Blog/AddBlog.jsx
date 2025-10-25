import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import slugify from "slugify";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";

const AddBlog = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );

  const [filePreview, setPreview] = useState();
  const [file, setFile] = useState();

  const formSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 characters long."),
    title: z.string().min(3, "Title must be at least 3 characters long."),
    slug: z.string().min(3, "Slug must be at least 3 characters long."),
    blogContent: z
      .string()
      .min(3, "Blog content must be at least 3 characters long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    form.setValue("blogContent", data);
  };

  const blogTitle = form.watch("title");

  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle, form]);

  async function onSubmit(values) {
    try {
      const newValues = { ...values, author: user.user._id };
      if (!file) {
        return showToast("error", "Feature image required.");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(newValues));

      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog/add`, {
        method: "post",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }

      form.reset();
      setFile(null);
      setPreview(null);
      navigate(RouteBlog);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0];
    const preview = URL.createObjectURL(file);
    setFile(file);
    setPreview(preview);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Create Blog</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Category
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryData?.category?.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter blog title"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Slug
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Slug" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Featured Image */}
              <div>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Featured Image
                </FormLabel>
                <Dropzone onDrop={handleFileSelection}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                        isDragActive
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    >
                      <input {...getInputProps()} />
                      {filePreview ? (
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="max-h-48 w-full object-contain rounded-md"
                        />
                      ) : (
                        <div className="text-center">
                          <p className="text-sm text-gray-500">
                            Drag & drop or click to upload an image
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            (JPG, PNG, max 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>

              {/* Blog Content */}
              <FormField
                control={form.control}
                name="blogContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Blog Content
                    </FormLabel>
                    <FormControl>
                      <Editor
                        props={{
                          initialData: field.value || "",
                          onChange: (data) => field.onChange(data),
                        }}
                        className="min-h-[300px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-violet-500 hover:bg-violet-600 text-white cursor-pointer"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;
