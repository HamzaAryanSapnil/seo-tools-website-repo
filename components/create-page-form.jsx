"use client";
import { createPageFormSchema } from "@/schemas/create-page-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const CreatePageForm = () => {
  const [pitch, setPitch] = useState("**Hello world!!!**");

  const form = useForm({
    resolver: zodResolver(createPageFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      // Add defaults for other fields if needed
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="w-full  mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Create Page</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter page title"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Slug
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="page-slug"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Content
                  </FormLabel>
                  <FormControl>
                    
                    <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
                      <MDEditor
                        data-color-mode="light"
                        value={field.value}
                        onChange={field.onChange}
                        height={300}
                        preview="edit"
                        className="min-h-[300px]"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Excerpt
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Short summary of the content..."
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg h-20"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">SEO Settings</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Meta Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter meta title"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Meta Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter meta description"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg h-32"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Publish Status
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePageForm;
