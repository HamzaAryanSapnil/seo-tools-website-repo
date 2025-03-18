
export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          All-in-One Online Toolkit
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Free online tools for developers, designers, and marketers
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for tools..."
              className="w-full px-6 py-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-3 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
