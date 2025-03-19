import React from 'react'
import FeedBackSlider from './FeedBackSlider'

const FeedBackSliderDetails = () => {
  return (
    <div className='my-14 font-roboto' >
      <div className='container mx-auto flex flex-col justify-center items-center gap-y-10' >
        <h1 className='text-4xl font-bold font-playfair text-seo-primary' > What our customers are saying about us </h1>
      </div>
      <FeedBackSlider/>
    </div>
  )
}

export default FeedBackSliderDetails
