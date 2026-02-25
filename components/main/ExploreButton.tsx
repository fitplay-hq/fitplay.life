"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ExploreButtonProps {
  className?: string;
}

export function ExploreButton({ className }: ExploreButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/product/5ec2973a-77da-445a-be23-6610e57ef933");
  };

  return (
    <button
      className={`w-full md:w-auto px-6 py-3 text-base md:px-6 md:py-3 md:text-sm lg:px-7 lg:py-3.5 lg:text-base xl:px-8 xl:py-4 xl:text-lg bg-white text-emerald-600 rounded-xl font-medium shadow-lg hover:bg-gray-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${className}`}
      onClick={handleClick}
    >
      Explore Sova X
    </button>
  );
}
