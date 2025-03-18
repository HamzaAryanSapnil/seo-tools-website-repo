
import HeroSection from "@/components/Homepage/Hero";
import CategoriesGrid from "@/components/Homepage/CategoriesGrid";




const getToolsByCategory = () => {
  return [
    {
      slug: "hashing",
      name: "Hashing Tools",
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
    // Add more categories...
  ];
};


export const metadata = {
  title: {
    default: `${getToolsByCategory()[0].name} `,
  },
};

export default function Home() {
  const categories = getToolsByCategory();

  return (
    <main>
      <HeroSection />
      <CategoriesGrid categories={categories} />

      {/* Add other sections (Pricing, Blog) */}
    </main>
  );
}
