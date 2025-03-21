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
import MDEditor from "@uiw/react-md-editor";
import { z } from "zod";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calculator,
  Ruler,
  Pencil,
  File,
  Bookmark,
  ImageIcon,
} from "lucide-react";

const editToolFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  order: z.number().min(0, "Order must be positive"),
  category: z.string().min(1, "Category is required"),
  iconType: z.enum(["file", "class"]),
  iconClass: z.string().optional(),
  dailyUsage: z.object({
    loggedIn: z.number().default(10),
    guest: z.number().default(5),
  }),
  homepage: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  image: z.instanceof(File).nullable().optional(),
});

const EditToolForm = () => {
  const form = useForm({
    resolver: zodResolver(editToolFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      order: 0,
      category: "",
      iconType: "class",
      iconClass: "",
      dailyUsage: { loggedIn: 10, guest: 5 },
      homepage: false,
      metaTitle: "",
      metaDescription: "",
      ogTitle: "",
      ogDescription: "",
      image: null,
    },
  });

  const iconOptions = [
    { name: "age-calculator", component: <Calculator className="h-6 w-6" /> },
    { name: "area-converter", component: <Ruler className="h-6 w-6" /> },
    { name: "articles-rewriter", component: <Pencil className="h-6 w-6" /> },
    { name: "bookmark-manager", component: <Bookmark className="h-6 w-6" /> },
  ];

  function onSubmit(values) {
    try {
      console.log(values);
      toast.success("Tool updated successfully!");
    } catch (error) {
      toast.error("Error updating tool");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          Object.values(errors).forEach((error) => {
            if (error.message) toast.error(error.message);
          });
        })}
        className="space-y-8"
      >
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200 space-y-8">
          {/* Edit Tool Section */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">Edit Tool</h3>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Tool title" {...field} />
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
                    <Input placeholder="tool-slug" {...field} />
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
                      placeholder="Short description"
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <MDEditor
                      data-color-mode="light"
                      value={field.value}
                      onChange={field.onChange}
                      height={400}
                      preview="edit"
                      className="min-h-[400px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Settings Section */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="conversion">Conversion</SelectItem>
                        <SelectItem value="seo">SEO</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Icon Section */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">Icon</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="iconType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select icon type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="file">File</SelectItem>
                        <SelectItem value="class">CSS Class</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="iconClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon Class Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter icon class" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2  md:grid-cols-4 gap-4">
              {iconOptions.map((icon) => (
                <div
                  key={icon.name}
                  onClick={() => form.setValue("iconClass", icon.name)}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    form.watch("iconClass") === icon.name
                      ? "bg-blue-50 border-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {icon.component}
                  <p className="mt-2 text-sm text-center capitalize">
                    {icon.name.replace("-", " ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Properties Section */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">Properties</h3>
            <div className="space-y-4">
              <div>
                <FormLabel>Daily Usage</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Daily usage restrictions refer to the limitations placed on
                  the number of requests that a user can perform within a
                  24-hour period.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dailyUsage.loggedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LoggedIn User</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dailyUsage.guest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest User</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Homepage Section */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">Homepage</h3>
            <FormField
              control={form.control}
              name="homepage"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Mark as Homepage</FormLabel>
                </FormItem>
              )}
            />
          </div>

          {/* SEO Settings */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">SEO Settings</h3>
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Textarea {...field} className="h-32" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* OG Settings */}
          <div className="space-y-6 border-b pb-6">
            <h3 className="text-xl font-semibold">OG Settings</h3>
            <FormField
              control={form.control}
              name="ogTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OG Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Textarea {...field} className="h-32" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Image Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Image</h3>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
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
          </div>

          <Button type="submit" className="w-full">
            Update Tool
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditToolForm;
