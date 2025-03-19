
export default function HeroSection() {
  return (
    <section
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),url('./seo-studio-banner.jpeg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className=" bg-gradient-to-b from-blue-50 to-white py-20 min-h-[90vh] flex justify-center items-center text-seo-primary font-roboto"
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
          All-in-One Online Toolkit
        </h1>
        <p className="text-xl text-gray-800 mb-8">
          Free online tools for developers, designers, and marketers
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for tools..."
              className="w-full px-6 py-4 rounded-lg border border-seo-primary text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-3 bg-seo-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
