import Link from "next/link";

export default function CategoriesGrid({ categories }) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
            <div className="space-y-3">
              {category.tools.map((tool) => (
                <Link
                  href={`/tools/${tool.slug}`}
                  key={tool.slug}
                  className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                      {/* Replace with your icon component */}
                      <span className="text-blue-600">⚙️</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{tool.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
