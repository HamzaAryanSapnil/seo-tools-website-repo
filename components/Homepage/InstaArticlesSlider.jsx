"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card, CardContent } from "@/components/ui/card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./sliderStyle.css";
import { Pagination, Autoplay } from "swiper/modules";

const FeedBackSlider = () => {
  const feedbacks = [
    {
      date: "Jan 20, 2025",
      title: "What Is TBH Meaning on Instagram?",
    },
    {
      date: "Jan 16, 2025",
      title: "How to Change Instagram Profile Picture",
    },
    {
      date: "Jan 6, 2025",
      title: "What Are Instagram Security Measures?",
    },
    {
      date: "Dec 23, 2024",
      title: "Instagram Quotes for Daughter: Share Your Love!",
    },
    {
      date: "Dec 23, 2024",
      title: "Creative Memory Captions for Instagram Posts",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 font-roboto my-10">
      <Swiper
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        spaceBetween={20}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {feedbacks.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="min-h-60 flex justify-center items-center" >
              <Card className="p-6 shadow-lg rounded-lg text-center flex flex-col justify-between h-full">
                <CardContent>
                  <h4 className="font-bold text-lg mt-4">{item.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                </CardContent>
              </Card>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default FeedBackSlider;
