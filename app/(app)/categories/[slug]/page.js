
import { TOOLS_CONFIG } from "@/data/toolConfig";
import Link from "next/link";

export default function CategoryPage({ params }) {
  const categoryTools = TOOLS_CONFIG.filter(
    (tool) => tool.category === params.slug
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize">
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
            href={`/tool/${tool.slug}`}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                {/* Tool icon */}
                <span className="text-blue-600">⚙️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{tool.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {tool.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
