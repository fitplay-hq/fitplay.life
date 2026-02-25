"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

export interface PricingFeature {
  id: number;
  icon: string;
  title: string;
  description?: string;
}

export interface PricingCardProps {
  type: "Starter" | "Elite";
  titlePrefix: string;
  titleHighlight: string;
  price: string;
  tagline: string;
  features: PricingFeature[];
  isPremium?: boolean;
  href: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  titlePrefix,
  titleHighlight,
  price,
  tagline,
  features,
  isPremium,
  href,
}) => {
  return (
    <div
      className={`relative group w-full ${isPremium ? "lg:-mt-4 lg:mb-4" : ""}`}
    >
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute -top-4 inset-x-0 flex justify-center z-20">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-emerald-500 text-white shadow-md text-[11px] sm:text-xs px-4 py-1.5 rounded-full flex items-center gap-1.5 font-bold tracking-widest uppercase border border-emerald-400"
          >
            <Star className="h-3 w-3 fill-white" />
            Most Popular
          </motion.div>
        </div>
      )}

      <div
        className={`relative rounded-[2rem] overflow-hidden h-full flex flex-col transition-all duration-300 ${
          isPremium
            ? "bg-[#0b2417] text-white border border-[#1a4a33] shadow-xl z-10"
            : "bg-white text-gray-900 border border-gray-100 shadow-xl"
        }`}
      >
        <div className="p-7 sm:p-8 flex flex-col h-full relative z-10">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex flex-col gap-1">
              <h3
                className={`text-2xl font-extrabold tracking-tight ${isPremium ? "text-white" : "text-gray-900"}`}
              >
                {titlePrefix}
              </h3>
              <div
                className={`text-sm font-bold uppercase tracking-widest ${isPremium ? "text-emerald-400" : "text-emerald-600"}`}
              >
                {titleHighlight}
              </div>
            </div>

            {/* Sova Logo */}
            <div className="flex flex-col justify-center">
              <Image
                src="/sova.webp"
                alt="Sova"
                width={56}
                height={56}
                className={`h-8 w-auto object-contain ${
                  isPremium ? "brightness-0 invert opacity-90" : ""
                }`}
              />
            </div>
          </div>

          {/* Pricing Info */}
          <div className="mb-6 flex items-baseline gap-1">
            <span
              className={`text-3xl font-bold ${isPremium ? "text-emerald-400" : "text-emerald-600"}`}
            >
              ₹
            </span>
            <span
              className={`text-4xl sm:text-5xl font-black tracking-tighter ${
                isPremium ? "text-white" : "text-gray-900"
              }`}
            >
              {price.replace("₹", "").replace("/-", "")}
            </span>
            <span
              className={`text-2xl font-bold ${isPremium ? "text-emerald-400" : "text-emerald-600"}`}
            >
              /-
            </span>
          </div>
          <p
            className={`text-sm mb-6 ${isPremium ? "text-emerald-100/70" : "text-gray-500"}`}
          >
            {tagline}
          </p>

          <div
            className={`h-px w-full mb-6 ${isPremium ? "bg-white/10" : "bg-gray-100"}`}
          />

          <div className="space-y-4 mb-8 flex-grow">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Simple Number */}
                <div
                  className={`mt-0.5 text-sm font-bold ${
                    isPremium ? "text-emerald-400" : "text-emerald-600"
                  }`}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </div>

                <div className="flex-1 min-w-0 pr-2">
                  <h4
                    className={`text-sm font-bold leading-tight ${isPremium ? "text-white" : "text-gray-900"}`}
                  >
                    {feature.title}
                  </h4>
                  {feature.description && (
                    <p
                      className={`text-[13px] mt-1 line-clamp-2 ${isPremium ? "text-emerald-100/60" : "text-gray-500"}`}
                    >
                      {feature.description}
                    </p>
                  )}
                </div>

                {/* Graphic Image */}
                <div className="flex-shrink-0 w-8 h-8 rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={
                      feature.title
                        .toLowerCase()
                        .includes("probiotic deficiency test")
                        ? "https://www.fitplay.life/_next/image?url=https%3A%2F%2Fu1dfrpi3ij.ufs.sh%2Ff%2FWeAa8lScfGDEqaVsTNICdMUXY9x7ADl21anWvH08eJ3okrEO&w=828&q=75"
                        : feature.title.toLowerCase().includes("glass bottle")
                          ? "/packs/glass_bottle.jpg"
                          : feature.title
                                .toLowerCase()
                                .includes("counselling") ||
                              feature.title
                                .toLowerCase()
                                .includes("consultation")
                            ? "https://www.fitplay.life/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0687%2F4523%2F2705%2Ffiles%2FConsultOldPDP.png%3Fv%3D1743995627&w=828&q=75"
                            : feature.title
                                  .toLowerCase()
                                  .includes("gut score") ||
                                feature.title
                                  .toLowerCase()
                                  .includes("gut report")
                              ? "/packs/gut_report.png"
                              : feature.icon
                    }
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Link
            href={href}
            className={`w-full mt-auto rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-base font-bold py-4 ${
              isPremium
                ? "bg-emerald-500 hover:bg-emerald-400 text-teal-950 shadow-lg"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }`}
          >
            Activate Plan
            {isPremium ? (
              <Sparkles className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
