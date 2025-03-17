"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { z } from "zod";
import { toast } from "sonner";

const TextAdvertisementForm = () => {
  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      name: "",
      title: "",
      targetUrl: "",
      content: "",
      image: null,
    },
  });

  function onSubmit(values) {
    try {
      console.log(values);
      toast.success("Advertisement created successfully!");
    } catch (error) {
      toast.error("Error creating advertisement");
    }
  }

  return (
    <div className="container mx-auto my-10 min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold text-center mb-10" > Text Advertisement</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* name field and title field */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Advertisement Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Campaign name"
                      {...field}
                      className="text-lg font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Advertisement title"
                      {...field}
                      className="text-lg font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Advertisement Image (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      field.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content Editor */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (Optional)</FormLabel>
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

          {/* Target URL */}
          <FormField
            control={form.control}
            name="targetUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
                    {...field}
                    type="url"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create a new Text Advertisement
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TextAdvertisementForm;
