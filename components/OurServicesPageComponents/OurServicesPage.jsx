import React from 'react'
import OurServicesCurrentStats from './OurServicesCurrentStats';

const OurServicesPage = () => {
  return (
    <div className="p-4 my-10 container mx-auto min-h-screen">
      <h1 className="w-full text-center text-4xl font-bold my-10 ">
        {" "}
        Free Digital Tools{" "}
      </h1>
      <h1 className="text-4xl font-bold xl:ml-5 my-5">Free Digital Tools Current Stats:</h1>
      <OurServicesCurrentStats/>
    </div>
  );
}

export default OurServicesPage
