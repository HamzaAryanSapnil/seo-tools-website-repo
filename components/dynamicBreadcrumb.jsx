"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routes = [
  { title: "Dashboard", url: "/dashboard" },
  { title: "Create Blog", url: "/dashboard/blog/create-blog" },
  { title: "Manage All Blogs", url: "/dashboard/blog/manage-blogs" },
];


// Breadcrumb component
export const DynamicBreadCrumb = () => {
    const pathname = usePathname();

    // get the path name from this pathname
    const path = pathname.split("/").filter(Boolean);
  return (
    <Breadcrumb className="w-full pl-5">
      <BreadcrumbList>
        {path?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex justify-center items-center gap-x-2"
            >
              <BreadcrumbItem>
                <BreadcrumbLink
                  key={index + 11}
                  href={`${
                    item === "blog"
                      ? "#"
                      : `/${path.slice(0, index + 1).join("/")}`
                  }`}
                  // /${path.slice(0, index + 1).join("/")}
                >
                  {" "}
                  <BreadcrumbPage key={index + 3}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </BreadcrumbPage>{" "}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== path.length - 1 && (
                <BreadcrumbSeparator key={index + 7} />
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

