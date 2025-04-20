import React from 'react'
import OurServicesCurrentStats from './OurServicesCurrentStats';
import OurServicesCards from './OurServicesCards';

const OurServicesPage = () => {
  return (
    <section className="p-4 my-10 container mx-auto min-h-screen space-y-6">
      <h1 className="w-full text-center text-4xl font-bold my-10 ">
        {" "}
        Free Digital Tools{" "}
      </h1>
      <h1 className="text-4xl font-bold xl:ml-5 my-5">
        Free Digital Tools Current Stats:
      </h1>
      <OurServicesCurrentStats />
      <div className='px-5' >
        <div className="bg-seo-des-color-first flex justify-center items-center p-4 text-white">
          <p className="py-3">
            Here’s Free Digital Tools services. A list of services our expert
            team can do for you quickly and accurately at a low price.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-x-4 justify-center items-center px-5">
        <div className="w-full h-1 bg-seo-des-color-first" />
        <h1 className="text-4xl font-bold text-center flex-1/2">
          Free Digital <br /> Tools
        </h1>
        <div className="w-full h-1 bg-seo-des-color-first" />
      </div>

      {/* services cards */}
      <OurServicesCards/>

    </section>
  );
}

export default OurServicesPage
