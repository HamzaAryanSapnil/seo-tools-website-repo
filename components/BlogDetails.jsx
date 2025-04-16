"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Custom renderer to add IDs and classes to headings
import { marked } from "marked";

const headingMap = new Map();

// import { marked } from "marked";

// const headingMap = new Map();

// marked.use({
//   walkTokens(token) {
//     if (token.type === "heading") {
//       const raw = token.text || "";
//       const id = raw
//         .toLowerCase()
//         .trim()
//         .replace(/\s+/g, "-")
//         .replace(/[^\w\-]+/g, "");
//       token.id = id;
//       headingMap.set(raw, id);
//     }
//   },
//   renderer: {
//     heading(text, level) {
//       let plainText = "";

//       if (typeof text === "string") {
//         plainText = text;
//       } else if (typeof text === "object" && Array.isArray(text.tokens)) {
//         plainText = text.tokens.map((t) => t.text).join(" ");
//       } else {
//         plainText = String(text || "heading");
//       }

//       const id =
//         headingMap.get(plainText) ||
//         plainText.toLowerCase().replace(/\s+/g, "-");

//       return `<h${level} id="${id}" class="blog-heading blog-h${level}">${plainText}</h${level}>`;
//     },
//   },
// });

marked.use({
  walkTokens(token) {
    if (token.type === "heading") {
      const raw = token.text || "";
      const id = raw
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "");
      token.id = id;
      headingMap.set(raw, id);
    }
  },
  renderer: {
    heading(text) {
      console.log("Text, level, token, raw: ", text);
      
      let plainText = "";

      if (typeof text === "string") {
        plainText = text;
      } else if (typeof text === "object" && Array.isArray(text.text)) {
        plainText = text?.text?.join("");
      } else {
        plainText = String(text || "heading");
      }

      const id =text
      return `<h${text?.depth} id="${text.id}" class="blog-heading blog-h${text.depth}">${text.text}</h${text.depth}>`;
    },
  },
});
const renderContent = (content) => {
  return marked.parse(content);
};

const BlogDetails = ({ blog, categories, recentPosts }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [titles, setTitles] = useState([]);

  

  useEffect(() => {
    const parseTitles = () => {
      const tempTitles = [];
      const contentElement = document.createElement("div");
      contentElement.innerHTML = renderContent(blog?.content);

      const hTags = contentElement.querySelectorAll("h1, h2, h3");
      hTags.forEach((tag) => {
        const id = tag.id || tag.textContent.replace(/\s+/g, "-").toLowerCase();
        tempTitles.push({
          id,
          title: tag.textContent,
          tag: tag.tagName.toLowerCase(),
        });
      });

      setTitles(tempTitles);
    };

    parseTitles();
  }, [blog.content]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setScrollPosition(scrollY);
    setSidebarVisible(scrollY > 100); // Just a little scroll
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 const handleLinkClick = (id) => {
   setTimeout(() => {
     const element = document.querySelector(`#${CSS.escape(id)}`);
     if (element) {
       const topPos = element.getBoundingClientRect().top + window.pageYOffset;
       window.scrollTo({
         top: topPos - 80, // offset for sticky header
         behavior: "smooth",
       });
     } else {
       console.warn("Element not found for ID:", id);
     }
   }, 50); // slight delay to ensure DOM is fully rendered
 };


  if (!blog) return <div>Blog not found</div>;

  return (
    <section className="min-h-screen bg-seo-sixth-color py-5">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-x-6 container mx-auto justify-center items-center">
        {/* TOC Sidebar */}
        <motion.div
          className={`col-span-1 lg:max-w-80 transition-opacity duration-700 ${
            sidebarVisible ? "opacity-100" : "opacity-0"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: sidebarVisible ? 1 : 0 }}
        >
          <div className="mb-8 bg-white border shadow-sm">
            <h3 className="text-xl font-bold mb-4 bg-seo-sixth-color text-start p-6">
              Table Of Content
            </h3>
            <ul>
              {titles.length > 0?titles?.map((title) => (
                <li key={title.id} className="mb-2">
                  <a
                    href={`#${title.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(title.id);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    {title.title}
                  </a>
                </li>
              )): <p className="text-center font-medium text-seo-primary my-5">No Titles To show</p> }
            </ul>
          </div>
        </motion.div>

        {/* Blog Content */}
        <div className="col-span-3 bg-white border shadow-sm">
          <h1 className="font-bold mb-4 border-b w-full p-4 text-center text-xl">
            {blog.title}
          </h1>
          <figure>
            <img
              src={blog?.coverImage}
              alt="blog cover image"
              className="w-full object-cover h-96 p-2"
            />
            <div className="flex gap-x-3 p-4">
              <p className="text-seo-forth-color font-bold">
                Views:{" "}
                <span className="text-seo-des-color-second font-normal">
                  {blog?.views} views
                </span>
              </p>
              <p className="text-seo-forth-color font-bold">
                Category:{" "}
                <span className="text-seo-des-color-second font-normal">
                  {blog?.category}
                </span>
              </p>
            </div>
          </figure>

          <div className="mb-8 p-4">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: renderContent(blog?.content) }}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1 lg:max-w-80 p-8 bg-white border shadow-sm">
          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul>
              {categories?.map((category) => (
                <li key={category._id} className="mb-2">
                  <a
                    href={`/category/${category._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
            <ul>
              {recentPosts?.map((post) => (
                <li key={post._id} className="mb-2">
                  <a
                    href={`/blogs/${post._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
