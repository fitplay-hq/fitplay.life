import React from "react";

interface GetStartedButtonProps {
  onClick: () => void;
  className?: string;
}

export function GetStartedButton({ onClick, className }: GetStartedButtonProps) {
  return (
    <button
      className={`w-full md:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      Get Started
    </button>
  );
}
