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
import { toast } from "sonner";
import { codeAdvertisementFormSchema } from "@/schemas/code-advertisement-form-schema";

const CodeAdvertisementForm = () => {
  const form = useForm({
      resolver: zodResolver(codeAdvertisementFormSchema),
      defaultValues: {
        name: "",
        title: "",
        content: "",
      },
    });

     function onSubmit(values) {
       try {
         console.log(values);
         toast.success("Code Advertisement created successfully!");
       } catch (error) {
         toast.error("Error creating code advertisement");
       }
     }
  return (
    <div className="container mx-auto my-10  flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold text-center mb-10">
        {" "}
        Code Advertisement
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            // Handle validation errors
            Object.values(errors).forEach((error) => {
              if (error.message) {
                toast.error(error.message);
              }
            });
          })}
          className="space-y-6 w-full"
        >
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

          <Button type="submit" className="w-full">
            Create a new Code Advertisement
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CodeAdvertisementForm;
