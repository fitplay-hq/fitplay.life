import React from "react";

interface LearnMoreButtonProps {
  onClick: () => void;
}

export function LearnMoreButton({ onClick }: LearnMoreButtonProps) {
  return (
    <button
      className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-700 rounded-xl font-semibold shadow-md hover:shadow-lg border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300"
      onClick={onClick}
    >
      Learn More
    </button>
  );
}
