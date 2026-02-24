"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { GetStartedButton } from "./GetStartedButton";
import Image from "next/image";

import startImg from "../../public/carousel/start.png";
import via1Img from "../../public/carousel/via-1.png";
import via2Img from "../../public/carousel/via-2.png";
import via3Img from "../../public/carousel/via-3.png";
import endImg from "../../public/carousel/end.png";

interface HomeCarouselProps {
  onGetStarted: () => void;
}

const carouselImages = [
  {
    src: startImg,
    showButton: true,
    buttonPosition:
      "md:bottom-[10%] md:left-[14%] lg:bottom-[12%] lg:left-[13%] xl:bottom-[12%] xl:left-[13%]",
  },
  {
    src: via1Img,
    showButton: true,
    buttonPosition:
      "md:bottom-[18%] md:left-[17.66666%] lg:bottom-[19%] lg:left-[16%] xl:bottom-[19%] xl:left-[16.5%]",
  },
  {
    src: via2Img,
    showButton: true,
    buttonPosition:
      "md:bottom-[22%] md:left-[15%] lg:bottom-[22%] lg:left-[15%] xl:bottom-[22%] xl:left-[15%]",
  },
  {
    src: via3Img,
    showButton: true,
    buttonPosition:
      "md:bottom-[20%] md:left-[15%] lg:bottom-[20%] lg:left-[15%] xl:bottom-[20%] xl:left-[14.5%]",
  },
  { src: endImg, showButton: false, buttonPosition: "" },
];

export function HomeCarousel({ onGetStarted }: HomeCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!api) return;
    intervalRef.current = setInterval(() => {
      api.scrollNext();
    }, 5000000);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [api, startTimer]);

  return (
    <>
      <div className="max-w-7xl mx-auto group relative">
        <Carousel
          opts={{ loop: true }}
          setApi={setApi}
          className="w-full border border-fitplay-green-200 rounded-2xl shadow-xl"
        >
          <CarouselPrevious
            onClickCapture={startTimer}
            variant="ghost"
            className="hidden sm:flex absolute left-4 size-8 sm:size-10 rounded-full bg-black/30 hover:bg-black/50 border-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 [&_svg]:size-6 md:[&_svg]:size-8 text-white backdrop-blur-sm"
          />
          <CarouselContent>
            {carouselImages.map((item, index) => (
              <CarouselItem key={index}>
                <div className="flex w-full items-center justify-center rounded-2xl overflow-hidden relative">
                  <Image
                    src={item.src}
                    alt={`Carousel image ${index + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                    priority={index === 0}
                  />
                  {item.showButton && (
                    <div
                      className={`absolute ${item.buttonPosition} -translate-x-1/2 z-20`}
                    >
                      <GetStartedButton
                        onClick={onGetStarted}
                        className="hidden md:flex"
                      />
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            onClickCapture={startTimer}
            variant="ghost"
            className="hidden sm:flex absolute right-4 size-8 sm:size-10 rounded-full bg-black/30 hover:bg-black/50 border-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 [&_svg]:size-6 md:[&_svg]:size-8 text-white backdrop-blur-sm"
          />
        </Carousel>
      </div>
      {/* Add Get Started button here which is only visible on mobile until the md breakpoint */}
      <div className="md:hidden mt-4">
        <GetStartedButton onClick={onGetStarted} />
      </div>
    </>
  );
}
