import React, { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

const testimonials = [
  {
    id: "sarthak",
    name: "Sarthak",
    role: "Fitness Enthusiast",
    videoSrc: "/testimonials/sarthak-sorax.mp4",
  },
  {
    id: "bala",
    name: "Bala Sarda",
    role: "Founder, Vahdam Teas",
    videoSrc: "/testimonials/bala-sarda-2.mp4",
  },
  {
    id: "shantanu",
    name: "Shantanu",
    role: "Entrepreneur",
    videoSrc: "/testimonials/shantanu-3.mp4",
  },
];

function TestimonialCard({
  testimonial,
  isPlaying,
  onPlay,
}: {
  testimonial: (typeof testimonials)[0];
  isPlaying: boolean;
  onPlay: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div
      className="relative group overflow-hidden rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-black cursor-pointer"
      onClick={onPlay}
    >
      <div className="relative aspect-[9/16] w-full bg-black/50">
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover rounded-3xl transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-80"}`}
          preload="metadata"
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          loop
          // Note: using key allows us to re-render if needed, but not necessary here
        >
          <source src={testimonial.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Custom Play Button Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
      )}

      {/* GradientOverlay for aesthetics */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/80 rounded-3xl" />

      {/* Optional Info Displayed Over Video */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none z-20">
        <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          <p className="text-lg font-bold text-white mb-1">
            {testimonial.name}
          </p>
          <p className="text-sm font-medium text-emerald-300">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Real Stories, Real <span className="text-emerald-600">Results</span>
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Hear directly from our community about how FitPlay has transformed
            their health and wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
