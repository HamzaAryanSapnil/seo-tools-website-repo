import React from 'react'
import InstaArticlesSlider from './InstaArticlesSlider';

const LatestInstagramArticlesSliderDetails = () => {
  return (
    <div className="my-14 font-roboto p-4">
      <div className="container mx-auto flex flex-col justify-center items-center gap-y-10">
        <h1 className=" text-3xl md:text-4xl font-bold font-playfair text-seo-secondary text-center">
          {" "}
          Latest Instagram Articles
        </h1>
      </div>
      <InstaArticlesSlider/>
    </div>
  );
}

export default LatestInstagramArticlesSliderDetails
