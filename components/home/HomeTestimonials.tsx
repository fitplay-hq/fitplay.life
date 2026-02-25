"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "FitPlay made it so easy for our team to access wellness benefits. The credit system is straightforward, and our employees actually use it regularly.",
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "TechCorp",
    image:
      "https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=fff",
    rating: 5,
  },
  {
    quote:
      "Finally, a wellness platform that our employees love. The product selection is great and the ordering process is seamless.",
    name: "Arjun Patel",
    role: "Marketing Manager",
    company: "StartupX",
    image:
      "https://ui-avatars.com/api/?name=Arjun+Patel&background=059669&color=fff",
    rating: 5,
  },
  {
    quote:
      "We've seen a 40% increase in wellness benefit utilization since switching to FitPlay. Our employees appreciate the flexibility.",
    name: "Meera Singh",
    role: "HR Director",
    company: "InnovateLab",
    image:
      "https://ui-avatars.com/api/?name=Meera+Singh&background=047857&color=fff",
    rating: 5,
  },
  {
    quote:
      "The customer support is excellent, and our team enjoys the variety of wellness products available. Highly recommend FitPlay!",
    name: "Rohit Verma",
    role: "Operations Lead",
    company: "HealthWave",
    image:
      "https://ui-avatars.com/api/?name=Rohit+Verma&background=065f46&color=fff",
    rating: 5,
  },
  {
    quote:
      "FitPlay has transformed the way we engage with employee wellness. The platform is intuitive and the feedback from our team has been overwhelmingly positive.",
    name: "Anjali Mehta",
    role: "People Manager",
    company: "BrightTech",
    image:
      "https://ui-avatars.com/api/?name=Anjali+Mehta&background=047857&color=fff",
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomeTestimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Voices of Transformation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we are revolutionizing wellness experiences for
            employees across leading organizations
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => {
              const container = document.getElementById(
                "testimonials-container"
              );
              if (container) {
                const isMobile = window.innerWidth < 768;
                const scrollAmount = isMobile
                  ? container.offsetWidth + 32
                  : 400; // +32 for gap on mobile
                const newScrollLeft = container.scrollLeft - scrollAmount;

                // If we're at the beginning, jump to the end of the first set
                if (newScrollLeft <= 0) {
                  const itemWidth = container.scrollWidth / 3;
                  container.scrollLeft = itemWidth + newScrollLeft;
                } else {
                  container.scrollBy({
                    left: -scrollAmount,
                    behavior: "smooth",
                  });
                }
              }
            }}
            className="absolute -left-3 md:-left-5 md:-translate-x-4 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-0 z-20 bg-emerald-900 hover:bg-emerald-500 text-emerald-600 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => {
              const container = document.getElementById(
                "testimonials-container"
              );
              if (container) {
                const isMobile = window.innerWidth < 768;
                const scrollAmount = isMobile
                  ? container.offsetWidth + 32
                  : 400; // +32 for gap on mobile
                const itemWidth = container.scrollWidth / 3;
                const newScrollLeft = container.scrollLeft + scrollAmount;

                // If we're at the end of the second set, jump back to the beginning of the second set
                if (newScrollLeft >= itemWidth * 2) {
                  container.scrollLeft =
                    itemWidth + (newScrollLeft - itemWidth * 2);
                } else {
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }
              }
            }}
            className="absolute right-0 md:mr-5 md:-right-5 md:translate-x-4 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-0 z-20 bg-emerald-900 hover:bg-emerald-500 text-emerald-600 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* LEFT FADE */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 md:w-24 bg-gradient-to-r from-emerald-50 to-transparent z-10" />

          {/* RIGHT FADE */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-12 md:w-24 bg-gradient-to-l from-emerald-50 to-transparent z-10" />

          {/* Scrollable Container */}
          <motion.div
            id="testimonials-container"
            className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory md:snap-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            onScroll={(e) => {
              const container = e.currentTarget;
              const itemWidth = container.scrollWidth / 3;

              if (container.scrollLeft >= itemWidth * 2 - 10) {
                container.scrollLeft = itemWidth;
              } else if (container.scrollLeft <= 10) {
                container.scrollLeft = itemWidth;
              }
            }}
          >
            {[...testimonials, ...testimonials, ...testimonials].map(
              (testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex-shrink-0 w-full md:w-[calc(33.333%-1.5rem)] snap-center md:snap-align-none"
                >
                  <Card className="bg-white hover:shadow-2xl transition-all duration-300 border-0 h-full">
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                delay:
                                  (index % testimonials.length) * 0.1 +
                                  i * 0.05,
                              }}
                            >
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div className="pt-4 border-t border-gray-100">
                          <div className="font-bold text-primary text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonial.role}
                          </div>
                          <div className="text-sm text-emerald-600 font-medium">
                            {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )}
          </motion.div>
        </div>

        <style jsx>{`
          #testimonials-container::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
