import { useState, useEffect, useRef } from "react";

export function useTestimonialVideo(isPlaying: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying && !isScrubbing) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isScrubbing]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsScrubbing(true);
    handlePointerMove(e);
  };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement> | PointerEvent
  ) => {
    if (!isScrubbing || !progressBarRef.current || !videoRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;

    setProgress(percentage * 100);
    videoRef.current.currentTime = videoRef.current.duration * percentage;
  };

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement> | PointerEvent
  ) => {
    e.stopPropagation();
    setIsScrubbing(false);
  };

  useEffect(() => {
    if (isScrubbing) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [isScrubbing]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!isScrubbing) {
      const video = e.currentTarget;
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    }
  };

  return {
    videoRef,
    progressBarRef,
    progress,
    isScrubbing,
    handlePointerDown,
    handleTimeUpdate,
  };
}
