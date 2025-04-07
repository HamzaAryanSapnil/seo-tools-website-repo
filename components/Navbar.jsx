import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const navlinks = [
    { title: "Home", url: "/" },
    { title: "Blog", url: "/blog" },
    { title: "Plans", url: "/plans" },
    { title: "Our Services", url: "/our-services" },
  ];
  return (
    <div className="navbar bg-base-100 py-5  font-roboto  ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu  menu-sm  dropdown-content  bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navlinks.map((link) => (
              <li
                className="hover:bg-seo-primary active:bg-seo-primary active:text-white transition-all 5s ease-in-out rounded-md "
                key={link.url}
              >
                <Link href={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* logo */}
        <Link
          href={"/"}
          className="md:px-3 text-xl h-auto  bg-none border-none bg-white border-white"
        >
          {" "}
          <Image
            src={"/logo.png"}
            alt="logo"
            width={1200}
            height={630}
            className="w-24 md:w-36 h-16 "
          />{" "}
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className=" flex justify-center items-center   gap-x-10 px-1 ">
          {navlinks.map((link) => (
            <li
              className="text-xl hover:text-white hover:bg-seo-first-color active:bg-seo-second-color active:text-white rounded-md p-2 transition-all duration-200 ease-in-out "
              key={link.url}
            >
              <Link href={link.url}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className=" navbar-end ">
        <Link
          href={"/login"}
          className="btn px-5 py-6 border-white bg-white text-xl hover:bg-seo-first-color active:bg-seo-second-color active:text-white rounded-md  transition-all duration-200 ease-in-out hover:text-white  "
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
