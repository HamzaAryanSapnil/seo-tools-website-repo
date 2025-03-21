"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const toolSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

const CreateToolPageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(toolSchema) });

  const onSubmit = async (data) => {
    console.log("Tool data:", data);
    // Here you’d make an API call to save the tool in the database
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      <Card className={"w-full"}>
        <CardHeader>
          <CardTitle>Create New Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Tool Title"
              placeholder="Enter tool title"
              {...register("title")}
              className="w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}

            <Textarea
              label="Tool Description"
              placeholder="Enter a short description"
              {...register("description")}
              className="w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}

            <Textarea
              label="Tool Content (Functionality)"
              placeholder="Enter tool content or functionality"
              {...register("content")}
              className="w-full"
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}

            <Input
              label="SEO Title"
              placeholder="Optional SEO Title"
              {...register("seoTitle")}
              className="w-full"
            />

            <Textarea
              label="SEO Description"
              placeholder="Optional SEO Description"
              {...register("seoDescription")}
              className="w-full"
            />

            <Button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Create Tool
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateToolPageForm;
