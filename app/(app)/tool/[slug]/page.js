// app/tools/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import { TOOLS_CONFIG } from "@/data/toolConfig";

export async function generateStaticParams() {
  return TOOLS_CONFIG.map((tool) => ({
    slug: tool.slug,
  }));
}

export default function ToolPage({ params }) {
  const tool = TOOLS_CONFIG.find((t) => t.slug === params.slug);

  if (!tool) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tool Header */}
          <div className="mb-8">
            <nav className="mb-4 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link
                href={`/categories/${tool.category}`}
                className="hover:text-blue-600"
              >
                {tool.category.replace(/-/g, " ")}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">{tool.name}</span>
            </nav>

            <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
            <p className="text-gray-600 text-lg">{tool.description}</p>
          </div>

          {/* Tool Interface Placeholder */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">
                Tool Interface Preview
              </h3>
              <p className="text-gray-500 mb-4">
                Tool functionality will be implemented here
              </p>
              <div className="bg-gray-100 rounded p-4 text-sm text-gray-500">
                <p>Input parameters/configurations will appear in this area</p>
              </div>
            </div>
          </div>

          {/* Tool Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Tool Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Category:</span>
                <span className="text-gray-600 capitalize">
                  {tool.category.replace(/-/g, " ")}
                </span>
              </div>

              {tool.fields?.map((field) => (
                <div
                  key={field.name}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <span className="font-medium">{field.label}:</span>
                  <span className="text-gray-600">
                    {field.defaultValue}
                    {field.name === "fileSize" && "MB"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 MonsterTools. All rights reserved.</p>
          <div className="mt-2">
            <Link href="/privacy" className="hover:text-blue-600 mx-2">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 mx-2">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
