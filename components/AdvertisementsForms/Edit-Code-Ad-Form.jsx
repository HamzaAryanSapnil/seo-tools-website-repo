// EditCodeAdvertisementForm.jsx
"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";


import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { codeAdvertisementFormSchema } from "@/schemas/code-advertisement-form-schema";
import { updateAdvertisement } from "@/lib/actions/advertisements/adUpdate";

const EditCodeAdvertisementForm = ({ adId }) => {
  const form = useForm({
    resolver: zodResolver(codeAdvertisementFormSchema),
    defaultValues: {
      name: "",
      title: "",
      content: "",
    },
  });

  // Fetch existing ad data on mount
  useEffect(() => {
    const loadAdvertisement = async () => {
      try {
        const res = await fetch(`/api/advertisements/${adId}`);
        const data = await res.json();
        form.reset({
          name: data.name,
          title: data.title,
          content: data.content || "",
        });
      } catch (err) {
        toast.error("Failed to load advertisement data");
      }
    };
    loadAdvertisement();
  }, [adId, form]);

  // Submit handler
  const onSubmit = async (values) => {
    try {
      const result = await updateAdvertisement(adId, { ...values });
      if (result.success) {
        toast.success("Code Advertisement updated successfully!");
      } else {
        toast.error(result.error || "Error updating code advertisement");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating code advertisement");
    }
  };

  return (
    <div className="container mx-auto my-10 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-center mb-10">
        Edit Code Advertisement
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            Object.values(errors).forEach((error) => {
              if (error.message) toast.error(error.message);
            });
          })}
          className="space-y-6 w-full"
        >
          {/* Name and Title fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Code content editor */}
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

          <Button type="submit" className="w-full">
            Update Code Advertisement
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditCodeAdvertisementForm;
