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

import img1 from "../../public/carousel/1.png";
import img2 from "../../public/carousel/2.png";
import img3 from "../../public/carousel/3.png";
import img4 from "../../public/carousel/4.png";
import img5 from "../../public/carousel/5.png";

interface HomeCarouselProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

const carouselImages = [img1, img2, img3, img4, img5];

export function HomeCarousel({ onGetStarted, onLearnMore }: HomeCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <>
      <div className="w-full max-w-6xl mx-auto group relative">
        <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
          <CarouselContent>
            {carouselImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="flex w-full items-center justify-center rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={img}
                    alt={`Carousel image ${index + 1}`}
                    className="w-full h-full object-cover"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

      <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
        <GetStartedButton onClick={onGetStarted} />
        <LearnMoreButton onClick={onLearnMore} />
      </div>
    </>
  );
}
