import React, { useState } from "react";
import { testimonials } from "./testimonials-data";
import { TestimonialCard } from "./TestimonialCard";

export function Testimonials() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Real Stories, Real <span className="text-emerald-600">Results</span>
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Hear directly from our community about how Sova has transformed
            their health and wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isPlaying={playingId === testimonial.id}
              onPlay={() => handlePlay(testimonial.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
