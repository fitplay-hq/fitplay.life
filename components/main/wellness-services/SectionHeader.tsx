"use client";
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  pillText: string;
  title: string;
  description: string;
}

export const SectionHeader = ({
  icon: Icon,
  pillText,
  title,
  description,
}: SectionHeaderProps) => {
  return (
    <div className="mb-10 text-center lg:text-left">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold tracking-wide uppercase mb-4"
      >

        <div className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5" />
          {pillText}
        </div>
      </motion.div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
        {title}
      </h2>
      <p className="text-base text-gray-600 max-w-xl lg:mx-0 mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
};
