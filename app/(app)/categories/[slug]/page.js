
import { TOOLS_CONFIG } from "@/data/toolConfig";
import Link from "next/link";
import { FaTemperatureHigh } from "react-icons/fa";

export default function CategoryPage({ params }) {
  const categoryTools = TOOLS_CONFIG.filter(
    (tool) => tool.category === params.slug
  );

  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize text-seo-light-green">
          {params.slug.replace("-", " ")} Tools
        </h1>
        <p className="text-gray-600 mt-2">
          All tools in this category ({categoryTools.length})
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoryTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="bg-white p-4 rounded-lg  shadow-[0_2px_10px_rgba(0,0,0,0.3)] border hover:shadow-[0_1px_10px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out"
          >
            <div className="font-medium text-seo-forth-color flex justify-center items-center gap-10 py-4">
              {" "}
              <span className="">
                {" "}
                <FaTemperatureHigh />{" "}
              </span>{" "}
              {tool.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
