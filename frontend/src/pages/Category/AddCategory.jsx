import React, { useEffect } from "react";
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

const AddCategory = () => {
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 character long."),
    slug: z.string().min(3, "Slug must be at least 3 character long."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const categoryName = form.watch("name");

  useEffect(() => {
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true });
      form.setValue("slug", slug);
    }
  }, [categoryName, form]);

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/category/add`,
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      form.reset();
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <Card className="w-full mx-auto shadow-lg border-0 sm:border">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="text-center sm:text-left mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Create Category
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Add a new category to organize your content
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6"
            >
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Category Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter category name"
                        {...field}
                        className="w-full text-sm sm:text-base"
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              {/* Slug Field */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Slug
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Auto-generated slug"
                        {...field}
                        className="w-full text-sm sm:text-base bg-gray-50"
                        readOnly
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-2 sm:pt-4">
                <Button
                  type="submit"
                  className="w-full sm:w-auto min-w-[120px] bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6"
                  size="lg"
                >
                  Create Category
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategory;
