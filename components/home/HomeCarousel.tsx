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
import { LearnMoreButton } from "./LearnMoreButton";
import Image from "next/image";

import startImg from "../../public/carousel/start.png";
import via1Img from "../../public/carousel/via-1.png";
import via2Img from "../../public/carousel/via-2.png";
import via3Img from "../../public/carousel/via-3.png";
import endImg from "../../public/carousel/end.png";

interface HomeCarouselProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

const carouselImages = [
  {
    src: startImg,
    showButton: true,
    buttonPosition:
      "md:bottom-[8%] md:left-[14.66666%] lg:bottom-[12%] lg:left-[12%] xl:bottom-[16%] xl:left-[10%]",
  },
  {
    src: via1Img,
    showButton: true,
    buttonPosition:
      "md:bottom-[12%] md:left-[17.66666%] lg:bottom-[16%] lg:left-[16%] xl:bottom-[16%] xl:left-[16%]",
  },
  {
    src: via2Img,
    showButton: true,
    buttonPosition:
      "md:bottom-[8%] md:left-[14.66666%] lg:bottom-[12%] lg:left-[12%] xl:bottom-[16%] xl:left-[10%]",
  },
  {
    src: via3Img,
    showButton: true,
    buttonPosition:
      "md:bottom-[8%] md:left-[14.66666%] lg:bottom-[12%] lg:left-[12%] xl:bottom-[16%] xl:left-[10%]",
  },
  { src: endImg, showButton: false, buttonPosition: "" },
];

export function HomeCarousel({ onGetStarted, onLearnMore }: HomeCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 70000000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <>
      <div className="max-w-7xl mx-auto group relative">
        <Carousel
          opts={{ loop: true }}
          setApi={setApi}
          className="w-full border border-fitplay-green-200 rounded-2xl shadow-xl"
        >
          <CarouselPrevious
            variant="ghost"
            className="hidden sm:flex absolute left-0 top-0 h-full w-12 -translate-y-0 rounded-none rounded-l-2xl bg-neutral-500/30 hover:bg-neutral-500/50 border-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 [&_svg]:size-4 md:[&_svg]:size-5 lg:[&_svg]:size-6 text-white"
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
            variant="ghost"
            className="hidden sm:flex absolute right-0 top-0 h-full w-12 -translate-y-0 rounded-none rounded-r-2xl bg-neutral-500/30 hover:bg-neutral-500/50 border-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 [&_svg]:size-4 md:[&_svg]:size-5 lg:[&_svg]:size-6 text-white"
          />
        </Carousel>
      </div>
      {/* Add Get STarted button here which is only visible on mobile until the md breakpoint */}
      <div className="md:hidden mt-4">
        <GetStartedButton onClick={onGetStarted} />
      </div>
    </>
  );
}
