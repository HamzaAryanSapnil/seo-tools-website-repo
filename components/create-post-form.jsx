"use client";
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
import { Separator } from "./ui/separator";
import { createPostFormSchema } from "@/schemas/create-post-form-schema";
import { TagsInput } from "./tag-input";

const CreatePostForm = () => {
  const [pitch, setPitch] = useState("**Hello world!!!**");

  const form = useForm({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      metaTitle: "",
      metaDescription: "",
      ogTitle: "",
      ogDescription: "",
      author: "",
      category: "", // Default to first category
      tags: "",
      image: null, // Ensure image starts as null
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200 grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* design the left column */}
          {/* create post */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold">Create New Post</h2>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter page title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="page-slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <MDEditor
                      data-color-mode="light"
                      value={field.value}
                      onChange={field.onChange}
                      height={300}
                      preview="edit"
                      className="min-h-[300px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Short summary of the content..."
                      {...field}
                      className="h-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* seo settings */}
            <h3 className="text-xl font-semibold">SEO Settings</h3>
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter meta title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter meta description"
                      {...field}
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* og settings */}
            <h3 className="text-xl font-semibold">OG Settings</h3>
            <FormField
              control={form.control}
              name="ogTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter OG title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ogDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter OG description"
                      {...field}
                      className="h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* author */}

            <h3 className="text-xl font-semibold">Author</h3>
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* right column */}
          <div className="space-y-6">
            <Button type="submit" className="w-full">
              Save
            </Button>
            <Separator />
            <h3 className="text-xl font-semibold">Select Category</h3>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Categories
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg">
                        <SelectValue placeholder="Select Categories" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="01">01</SelectItem>
                      <SelectItem value="02">02</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    {/* <Textarea placeholder="Enter tags" {...field} /> */}
                    <TagsInput
                      value={field.value || []}
                      onChange={(tags) => field.onChange(tags.join(","))}
                    />
                  </FormControl>
                 
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        field.onChange(file); // Pass the File object directly
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;
