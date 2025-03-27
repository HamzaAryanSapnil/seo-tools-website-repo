// components/EditCategoryForm.jsx
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
import { Textarea } from "@/components/ui/textarea";
import { toolsCategoryFormSchema } from "@/schemas/tools-category-form-schema";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateCategory } from "@/lib/actions/categoryActions";
import { useRouter } from "next/navigation";

const generateSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const EditCategoryForm = ({ initialData }) => {
  const router = useRouter();
  const [isSlugManuallyModified, setIsSlugManuallyModified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(toolsCategoryFormSchema),
    defaultValues: {
      name: initialData.name,
      slug: initialData.slug,
      title: initialData.title,
      description: initialData.description,
      metaTitle: initialData.metaTitle,
      metaDescription: initialData.metaDescription,
    },
  });

  const nameValue = form.watch("name");
  const slugValue = form.watch("slug");

  // Auto-generate slug when name changes
  useEffect(() => {
    if (!isSlugManuallyModified && nameValue) {
      const generatedSlug = generateSlug(nameValue);
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [nameValue, form, isSlugManuallyModified]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const result = await updateCategory(initialData._id, values);

      if (result.status === "SUCCESS") {
        toast.success("Category updated successfully");
        router.push("/dashboard/categories");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Failed to update category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 max-w-2xl mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
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
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="category-slug"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setIsSlugManuallyModified(true);
                    }}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const generatedSlug = generateSlug(form.getValues("name"));
                    form.setValue("slug", generatedSlug);
                    setIsSlugManuallyModified(false);
                  }}
                >
                  Generate Slug
                </Button>
              </div>
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
                <Input placeholder="Enter display title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Category description..."
                  {...field}
                  className="h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metaTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Title</FormLabel>
              <FormControl>
                <Input placeholder="SEO meta title" {...field} />
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
                  placeholder="SEO meta description..."
                  {...field}
                  className="h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            "Update Category"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditCategoryForm;
