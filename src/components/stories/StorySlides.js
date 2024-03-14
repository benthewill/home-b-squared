"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useSpring, animated, to } from "@react-spring/web";
import { Waypoint } from "react-waypoint";
import { useState } from "react";
import { Chip, ScrollShadow, Checkbox, Button, Link } from "@nextui-org/react";

export default function StorySlides({
  slidesData,
  storyID,
  storyDate,
  storyDraft,
}) {
  return (
    <>
      <div className="flex flex-row gap-6 px-0 md:h-full md:px-20">
        <Button
          color="default"
          variant="shadow"
          // size="sm"
          radius="sm"
          className="h-6 p-0 text-xs font-bold md:p-4 md:text-sm "
          as={Link}
          href={`/stories/texts/${storyID}`}
        >
          Text Mode
        </Button>
        <Button
          color="default"
          variant="shadow"
          // size="sm"
          radius="sm"
          className="h-6 p-0 px-2 text-xs font-bold md:p-4 md:px-0 md:text-sm "
          as={Link}
          href={`/stories/texts/${storyID}#personal-note`}
        >
          Personal Notes
        </Button>
      </div>
      <Swiper
        style={{
          "--swiper-pagination-color": "#fff",
          "--swiper-navigation-color": "#fff",
          "--swiper-navigation-size": "1vw",
          "--swiper-navigation-top_offset": "1000px",
        }}
        keyboard={{
          enabled: true,
        }}
        className="h-1/2"
        centeredSlides={true}
        navigation={true}
        modules={[Keyboard, Navigation]}
        // spaceBetween={50}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {slidesData.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="md:py-30 h-auto w-full px-0 py-10 md:h-full md:px-20">
                {slide.map((line, lineIndex) => {
                  return (
                    <div
                      key={`line_${lineIndex}`}
                      // className={`${indentVariants[lineIndex]}`}
                      className="pb-10 text-left text-2xl font-bold md:text-4xl"
                    >
                      <p>{line}</p>
                    </div>
                  );
                })}
                <div className="flex w-full flex-row gap-5">
                  {/* <p>Swipe Left</p> */}
                  <p className="text-xs font-thin">
                    Swipe Left/Right
                    <br /> or use Keyboard Arrows
                  </p>
                </div>
                {/* </ScrollShadow> */}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="mt-16 w-full justify-end">
        <Chip
          radius="sm"
          size="lg"
          variant="flat"
          color="default"
          className="justify-end"
        >
          <p className="font-medium">
            draft #{storyDraft} - {storyDate}
          </p>
        </Chip>
      </div>
    </>
  );
}
