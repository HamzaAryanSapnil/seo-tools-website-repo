import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SeoStudioToolsStats = () => {
  return (
    <section className="my-14 font-roboto p-4">
      <div className="container mx-auto flex flex-col justify-center items-center gap-y-10">
        <div className="flex flex-col justify-center items-center gap-y-6">
          <h1 className="text-4xl font-bold font-playfair text-seo-secondary ">
            SEOStudio Tools
          </h1>
          <p className="text-gray-600 text-center md:w-3xl text-base/6">
            Free online Seo, Text, Image, Youtube, Web Management, Web
            Development, Converter, Calculator tools and more for developers,
            designers, and marketers
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-6">
          <div className="flex  flex-col  justify-center items-center gap-y-10 gap-6">
            <h1 className="text-4xl font-bold font-montserrat text-seo-secondary uppercase">
              {" "}
              As Seen In:{" "}
            </h1>
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-x-4 gap-y-4 ">
              <div className="flex justify-center items-center m-0 p-0 border shadow-md w-72 hover:shadow-xl transition-all duration-300 ease-in-out">
                <img
                  src="./producthunt-logo.jpg"
                  alt="product hunt logo"
                  srcset=""
                  className="w-20  "
                />
                <img
                  src="./producthunt-text.jpg"
                  alt="product hunt logo"
                  srcset=""
                  className="w-36  "
                />
              </div>
              <div className="w-72 border shadow-md flex justify-center items-center hover:shadow-xl transition-all duration-300 ease-in-out">
                <img
                  src="./reddit.jpg"
                  alt="reddit logo"
                  srcset=""
                  className="w-36 "
                />
              </div>
              <div className="w-72 border shadow-md flex justify-center items-center hover:shadow-xl transition-all duration-300 ease-in-out">
                <img
                  src="./brave.png"
                  alt="brave browser logo"
                  srcset=""
                  className="w-36 "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-y-6 my-5">
          <h1 className="text-2xl text-center font-bold font-playfair-display text-seo-secondary uppercase">
            {" "}
            We are growing together
          </h1>
          {/* stats */}
          <div className="flex flex-wrap justify-center items-center gap-6 ">
            <Card>
              <CardHeader className="">
                {/* <CardDescription>Total Revenue</CardDescription> */}
                <CardTitle className="flex justify-center items-center text-4xl font-montserrat text-seo-light-green">
                  170+
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm  text-seo-primary">
                  Free Online Tools
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="">
                {/* <CardDescription>Total Revenue</CardDescription> */}
                <CardTitle className="flex justify-center items-center text-4xl font-montserrat text-seo-light-green">
                  6.2M+
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm  text-seo-primary">
                  Time Tools Used
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="">
                {/* <CardDescription>Total Revenue</CardDescription> */}
                <CardTitle className="flex justify-center items-center text-4xl font-montserrat text-seo-light-green">
                  9K+
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm  text-seo-primary">
                  Daily Users
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="">
                {/* <CardDescription>Total Revenue</CardDescription> */}
                <CardTitle className="flex justify-center items-center text-4xl font-montserrat text-seo-light-green">
                  800K+
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm  text-seo-primary">
                  Page Views/Month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="">
                {/* <CardDescription>Total Revenue</CardDescription> */}
                <CardTitle className="flex justify-center items-center text-4xl font-montserrat text-seo-light-green">
                  320K+
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm  text-seo-primary">
                  Search Clicks/Month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoStudioToolsStats;
