// components/BlogsCard.js
import Link from "next/link";

export default function BlogsCard({ item }) {
  return (
    <div className="card bg-white shadow-sm xl:h-96 overflow-hidden">
      <figure>
        <img
          src={item.coverImage}
          alt="Blog Image"
          className="rounded-lg  object-cover h-52 w-full "
        />
      </figure>
      <div className="card-body justify-start">
        <h2 className="card-title text-seo-second-color">
          {item.title.length > 40
            ? item.title.slice(0, 40) + "..."
            : item.title}
        </h2>
        <p className="text-start text-seo-des-color-second font-medium">
          {item.excerpt.length > 40
            ? item.excerpt.slice(0, 40) + "..."
            : item.excerpt}
        </p>
        <div className="card-actions justify-end">
          <Link href={`/blogs/${item._id}`}>
            <button className="btn bg-seo-forth-color text-white hover:bg-seo-first-color border-none">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
