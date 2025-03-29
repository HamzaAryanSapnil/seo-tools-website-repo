// EditImageAdvertisementForm.jsx
"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { imageAdvertisementFormSchema } from "@/schemas/image-advertisement-form-schema";
import { updateAdvertisement } from "@/lib/actions/advertisements/update";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditImageAdvertisementForm = ({ adId }) => {
  const [loading, setLoading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const form = useForm({
    resolver: zodResolver(imageAdvertisementFormSchema),
    defaultValues: {
      name: "",
      title: "",
      targetUrl: "",
      image: null, // file input
    },
  });

  // Fetch current advertisement data
  useEffect(() => {
    const loadAdvertisement = async () => {
      try {
        const res = await fetch(`/api/advertisements/${adId}`);
        const data = await res.json();
        form.reset({
          name: data.name,
          title: data.title,
          targetUrl: data.targetUrl || "",
          image: null,
        });
        if (data.imageUrl) {
          setCurrentImageUrl(data.imageUrl);
        }
      } catch (err) {
        toast.error("Failed to load advertisement data");
      }
    };
    loadAdvertisement();
  }, [adId, form]);

  // Helper to upload image file and get URL
  const uploadImageToImgbb = async (file) => {
    try {
      const imgBBApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const imgBBApiUrl = process.env.NEXT_PUBLIC_IMGBB_URL;
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(imgBBApiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { key: imgBBApiKey },
      });
      const url = response?.data?.data?.url;
      if (!url) throw new Error("Image upload failed");
      return url;
    } catch (error) {
      toast.error(error?.message || "Image upload failed");
      return null;
    }
  };

  // Submit handler
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      let imageUrl = currentImageUrl;
      if (values.image instanceof File) {
        imageUrl = await uploadImageToImgbb(values.image);
      }
      // Ensure we have an image URL (required for image ads)
      if (!imageUrl) {
        toast.error("Advertisement image is required.");
        setLoading(false);
        return;
      }
      values.image = imageUrl;
      const result = await updateAdvertisement(adId, { ...values });
      if (result.success) {
        toast.success("Image Advertisement updated successfully!");
      } else {
        toast.error(result.error || "Error updating image advertisement");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating image advertisement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-10 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-center mb-10">
        Edit Image Advertisement
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

          {/* Image file input */}
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

          {/* Target URL field */}
          <FormField
            control={form.control}
            name="targetUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target URL (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
                    type="url"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Update Image Advertisement"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditImageAdvertisementForm;
