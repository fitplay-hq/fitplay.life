"use client";

import React from "react";
import Hero from "@/components/Hero";
import NetworkOfCompanies from "@/components/home/NetworkOfCompanies";
import HowItWorks from "@/components/home/HowItWorks";
import CategoriesWeOffer from "@/components/home/CategoriesWeOffer";
import WhyFitPlay from "@/components/home/WhyFitPlay";
import TrustedWellnessPartners from "@/components/home/TrustedWellnessPartners";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="space-y-8 md:space-y-12">
      <Hero />
      {/* <NetworkOfCompanies /> */}
      <HowItWorks />
      <CategoriesWeOffer />
      <WhyFitPlay />
      {/* <TrustedWellnessPartners /> */}
      {/* <HomeTestimonials /> */}
      <CTASection />
    </div>
  );
}
