import React, { useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { Testimonial } from "./testimonials-data";
import { useTestimonialVideo } from "./useTestimonialVideo";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isPlaying: boolean;
  onPlay: () => void;
}

export function TestimonialCard({
  testimonial,
  isPlaying,
  onPlay,
}: TestimonialCardProps) {
  const {
    videoRef,
    progressBarRef,
    progress,
    isScrubbing,
    handlePointerDown,
    handleTimeUpdate,
  } = useTestimonialVideo(isPlaying);

  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      // Ensure volume is at 0.8 when unmuted, if that was the intent.
      // video.muted handles the actual mute state without overriding the base volume prop.
      videoRef.current.volume = 0.8;
      setIsMuted(!isMuted);
    }
  };

  // Set default volume on mount or when playing state changes
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.8;
      videoRef.current.muted = isMuted;
    }
  }, [isPlaying]);

  return (
    <div
      className="relative group overflow-hidden w-full max-w-[280px] sm:max-w-[320px] md:max-w-none mx-auto rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-black cursor-pointer"
      onClick={onPlay}
    >
      <div className="relative aspect-[9/16] w-full bg-black/50">
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover rounded-3xl transition-opacity duration-300 ${
            isPlaying ? "opacity-100" : "opacity-80"
          }`}
          preload="metadata"
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          loop
          onTimeUpdate={handleTimeUpdate}
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
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none z-20 flex justify-between items-end">
        <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          <p className="text-lg font-bold text-white mb-1">
            {testimonial.name}
          </p>
          <p className="text-sm font-medium text-emerald-300">
            {testimonial.role}
          </p>
        </div>

        {/* Sound Toggle Button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="pointer-events-auto w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-white"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Progress Bar Container - Interactive */}
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 right-0 h-4 bg-transparent z-30 cursor-pointer group/progress touch-none"
        onClick={(e) => e.stopPropagation()} // Prevent pausing the video
        onPointerDown={handlePointerDown}
      >
        {/* Visual Bar Track */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 transition-all duration-150 group-hover/progress:h-2" />

        {/* Filled Progress */}
        <div
          className="absolute bottom-0 left-0 h-1.5 bg-emerald-500 transition-all duration-75 group-hover/progress:bg-emerald-400 group-hover/progress:h-2"
          style={{ width: `${progress}%` }}
        />

        {/* Scrubber Knob */}
        <div
          className={`absolute bottom-0 h-4 w-4 bg-white rounded-full shadow-lg border border-emerald-500 transform -translate-x-1/2 translate-y-1 transition-all duration-150 ${
            isScrubbing
              ? "opacity-100 scale-125"
              : "opacity-0 scale-75 group-hover/progress:opacity-100 group-hover/progress:scale-100"
          }`}
          style={{ left: `${progress}%`, pointerEvents: "none" }}
        />
      </div>
    </div>
  );
}
