
import HeroSection from "@/components/Homepage/Hero";
import CategoriesGrid from "@/components/Homepage/CategoriesGrid";


const getToolsByCategory = () => {
  return [
    {
      slug: "hashing",
      name: "Hashing Tools 1",
      tools: [
        {
          slug: "md5-generator",
          name: "MD5 Generator",
          description: "Generate MD5 hashes from text",
          category: "hashing",
        },
        // Add more tools...
      ],
    },
    {
      slug: "hashing",
      name: "Hashing Tools 2",
      tools: [
        {
          slug: "md5-generator",
          name: "MD5 Generator",
          description: "Generate MD5 hashes from text",
          category: "hashing",
        },
        // Add more tools...
      ],
    },
    {
      slug: "hashing",
      name: "Hashing Tools 3",
      tools: [
        {
          slug: "md5-generator",
          name: "MD5 Generator",
          description: "Generate MD5 hashes from text",
          category: "hashing",
        },
        // Add more tools...
      ],
    },
    {
      slug: "hashing",
      name: "Hashing Tools 4",
      tools: [
        {
          slug: "md5-generator",
          name: "MD5 Generator",
          description: "Generate MD5 hashes from text",
          category: "wordpress",
        },
        // Add more tools...
      ],
    },
    // Add more categories...
  ];
};

export default function Home() {
  const categories = getToolsByCategory();

  return (
    <main>
      <HeroSection />
      <CategoriesGrid categories={categories} />

    </main>
  );
}
