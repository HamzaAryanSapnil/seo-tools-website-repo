import axios from "axios";
import Link from "next/link";
import { FaTemperatureHigh } from "react-icons/fa";

const AllToolsInThisCategoryPage = async ({ params }) => {
  const { slug } = await params;
  const categorySlug = slug?.replace(/-/g, " "); // Convert "pdf-tools" to "Pdf Tools"
    const res = await axios.get(
      `http://localhost:3000/api/admin/tools?category=${categorySlug}`
    );
    const tools = res?.data || [];
    console.log("Category Tools from API: ", tools);

  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize text-seo-light-green">
          {slug.replace("-", " ")}
        </h1>
        <p className="text-gray-600 mt-2">
          All tools in this category ({tools.length})
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
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
};

export default AllToolsInThisCategoryPage;

// import { TOOLS_CONFIG } from "@/data/toolConfig";
// import axios from "axios";
// import Link from "next/link";
// import { FaTemperatureHigh } from "react-icons/fa";

// const CategoryPage = async ({ params }) => {
//   const { id } = await params;
//   console.log("Category from params: ", id);
//   const categoryReplaced = id.replace("-", " ");
//   console.log("Category Replaced: ", categoryReplaced);

//     const categoryTools = TOOLS_CONFIG.filter((tool) => tool.category === category);
//   const res = await axios.get(
//     `http://localhost:3000/api/admin/tools?category=${categoryReplaced}`
//   );
//   const tools = res?.data || [];
//   console.log("Category Tools: ", tools);

//   return (
//     <div className="container mx-auto px-4 py-12 ">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold capitalize text-seo-light-green">
//           {slug.replace("-", " ")}
//         </h1>
//         <p className="text-gray-600 mt-2">
//           All tools in this category ({categoryTools.length})
//         </p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {categoryTools.map((tool) => (
//           <Link
//             key={tool.slug}
//             href={`/tools/${tool.slug}`}
//             className="bg-white p-4 rounded-lg  shadow-[0_2px_10px_rgba(0,0,0,0.3)] border hover:shadow-[0_1px_10px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out"
//           >
//             <div className="font-medium text-seo-forth-color flex justify-center items-center gap-10 py-4">
//               {" "}
//               <span className="">
//                 {" "}
//                 <FaTemperatureHigh />{" "}
//               </span>{" "}
//               {tool.name}
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;
