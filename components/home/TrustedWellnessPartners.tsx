"use client";

import React from "react";
import Marquee from "react-fast-marquee";

const wellnessPartners = [
  {
    name: "Cult.fit",
    category: "Fitness",
    logo: "https://logo.clearbit.com/cure.fit",
  },
  {
    name: "HealthKart",
    category: "Nutrition",
    logo: "https://logo.clearbit.com/healthkart.com",
  },
  {
    name: "Thyrocare",
    category: "Diagnostics",
    logo: "https://logo.clearbit.com/thyrocare.com",
  },
  {
    name: "Practo",
    category: "Mental Health",
    logo: "https://logo.clearbit.com/practo.com",
  },
  {
    name: "Decathlon",
    category: "Equipment",
    logo: "https://logo.clearbit.com/decathlon.com",
  },
  {
    name: "MediBuddy",
    category: "Services",
    logo: "https://logo.clearbit.com/medibuddy.in",
  },
  {
    name: "1mg",
    category: "Wellness",
    logo: "https://logo.clearbit.com/1mg.com",
  },
  {
    name: "Nykaa",
    category: "Beauty & Wellness",
    logo: "https://logo.clearbit.com/nykaa.com",
  },
];

export default function TrustedWellnessPartners() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Trusted Wellness Partners
          </h2>
          <p className="text-xl text-gray-600">
            We partner with leading brands to bring you the best in wellness
          </p>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <Marquee speed={40} pauseOnHover={true} gradient={false}>
            {wellnessPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="w-40 p-6 bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl text-center shadow-lg hover:shadow-xl flex-shrink-0 mx-6"
              >
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 p-4 shadow-sm">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          </div>`;
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
