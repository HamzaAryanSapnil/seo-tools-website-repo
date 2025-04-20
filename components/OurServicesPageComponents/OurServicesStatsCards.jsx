import React from "react";

const OurServicesStatsCards = ({ stats }) => {
  const { icon, title, value, className } = stats;
  console.log(stats);
  
  return (
    <div
      className={` ${className} h-52 w-full xl:w-96 flex flex-col justify-center items-center gap-y-6 p-4 `}
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <i className="text-4xl font-bold"> {icon ?? null} </i>
      <h1 className="text-4xl font-bold">{value}</h1>
      <p className="text-seo-des-color-first" >{title}</p>
    </div>
  );
};

export default OurServicesStatsCards;
