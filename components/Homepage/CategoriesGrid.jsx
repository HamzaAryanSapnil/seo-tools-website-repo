// components/Homepage/CategoriesGrid.js
import Link from "next/link";
import { Button } from "../ui/button";

export default function CategoriesGrid({ categories }) {
  return (
    <section className="container mx-auto px-4 py-12 space-y-16 font-roboto my-10">
      {categories.slice(0, 10).map((category) => (
        <div key={category.slug} className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold font-inter text-center text-seo-primary">
              {category.name}
            </h2>
            {category.tools.length > 10 && (
              <Link
                href={`/categories/${category.slug}`}
                className="text-blue-600 hover:underline"
              >
                See All ({category.tools.length})
              </Link>
            )}
          </div>

          {category.layoutType === "list" ? (
            // List layout for Keywords Tools
            <div className="bg-white rounded-lg shadow-md p-6">
              {category.tools.slice(0, 10).map((tool) => (
                <div key={tool.slug} className="py-3 border-b last:border-0">
                  <Link
                    href={`/tool/${tool.slug}`}
                    className="flex justify-between items-center hover:bg-gray-50 p-2 rounded"
                  >
                    <span className="font-medium ">{tool.name}</span>
                    <span className="text-gray-500 text-sm">
                      {tool.description}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            // Grid layout for Website Tracking Tools
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.tools.slice(0, 10).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tool/${tool.slug}`}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="font-medium">{tool.name}</div>
                  <div className="text-gray-600 text-sm mt-1">
                    {tool.description}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
      {categories.length > 10 && (
        <div className="text-center">
          <Link href="/our-services">
            <Button className={"text-seo-primary text-lg bg-white shadow-lg py-5 hover:bg-seo-primary hover:text-white"} >See All Our Services</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
