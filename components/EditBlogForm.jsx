"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";

import { blogFormSchema } from "@/schemas/blog-form-schema";
import { updateBlogServerAction } from "@/lib/actions/blogs/updateBlog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const EditBlogForm = ({ initialData, categories }) => {
 

 
  const [loading, setLoading] = useState(false);
  const [fileImage, setFileImage] = useState(null);

  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      ...initialData,
      category: initialData?.category?._id || "", // Use category._id as the default value
    },
  });

   useEffect(() => {
     if (initialData) {
       form.reset({
         ...initialData,
         category: initialData?.category?._id || "", // Reset with category._id
       });
     }
   }, [initialData, form]);

  const uploadImageToImgbb = async (file) => {
    try {
      const imgBBApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; // use NEXT_PUBLIC_ so it's exposed to client
      const imgBBApiUrl = process.env.NEXT_PUBLIC_IMGBB_URL;
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(imgBBApiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          key: imgBBApiKey,
        },
      });

      if (!response?.data?.data?.url) {
        toast.error("Image upload failed");
      }

      return response?.data?.data?.url || null;
    } catch (error) {
      toast.error(error?.message || "Image upload failed");
    }
  };
  const onSubmit = async (values) => {
    try {
      if (values.coverImage instanceof File) {
        const imgUrl = await uploadImageToImgbb(values.coverImage);
        if (!imgUrl) {
          toast.error("Image upload failed");
          return;
        }
        values.coverImage = imgUrl;
      }
      setLoading(true);
      const res = await updateBlogServerAction(initialData._id, values);

      if (res?.status === "SUCCESS") {
        toast.success(res.message ?? "Blog updated successfully");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error uploading image", error);
      toast.error(error.message ?? "Blog update failed");
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="slug"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="excerpt"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Image</h3>
          <div className="border-dashed border-2 border-gray-500 h-56 flex items-center justify-center">
            <Image
              src={
                fileImage
                  ? fileImage
                  : initialData?.coverImage
                  ? initialData?.coverImage
                  : null
              }
              alt="Blog Image"
              width={2048}
              height={1080}
              className="w-full h-full object-cover"
            />
          </div>
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
                      setFileImage(URL.createObjectURL(file));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select value={field.value ?? ""} onValueChange={(value) => field.onChange(value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  height={400}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            name="metaTitle"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="metaDescription"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField
            name="ogTitle"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>OG Title</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="ogDescription"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>OG Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="featured"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured</FormLabel>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value ?? false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update Blog"}
        </Button>
      </form>
    </Form>
  );
};

export default EditBlogForm;
