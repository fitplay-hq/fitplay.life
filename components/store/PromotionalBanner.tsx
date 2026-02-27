import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Building2 } from "lucide-react";
import Image from "next/image";

export const PromotionalBanner = () => {
  return (
    <>
      <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(16,185,129,0.15)] border border-emerald-100/40 bg-white mb-8 group">
        {/* Background Gradient & Glows */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white"></div>

        {/* Abstract Glassmorphism Shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-teal-200/20 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="relative p-8 md:p-14 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Column: Content */}
          <div className="flex-1 text-left space-y-8 max-w-2xl z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/50 border border-emerald-200/50 text-emerald-800 text-sm font-semibold tracking-wide backdrop-blur-sm mb-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Corporate Wellness Marketplace
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-800 leading-tight tracking-tight drop-shadow-sm"
            >
              Elevate Everyday Wellness
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-slate-600 text-lg md:text-xl font-medium max-w-xl leading-relaxed"
            >
              Discover curated health solutions, diagnostics, and performance
              tools designed to support modern workforces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => {
                  document
                    .getElementById("main-content")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-7 rounded-2xl font-semibold shadow-[0_8px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)] transition-all hover:-translate-y-1"
              >
                Explore Products
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-emerald-100/50"
            >
              <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Secure Payments
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                <BadgeCheck className="w-5 h-5 text-emerald-500" />
                Verified Vendors
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                <Building2 className="w-5 h-5 text-emerald-500" />
                Corporate Ready
              </div>
            </motion.div>
          </div>

          {/* Right Column: Abstract Graphic / Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 relative z-10 flex justify-center w-full"
          >
            {/* Abstract Graphic / Image Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="relative w-full aspect-[4/3] max-w-[500px] rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white bg-white"
            >
              <Image
                src="https://u1dfrpi3ij.ufs.sh/f/WeAa8lScfGDEig7rjQ09QJ0mzTqtGBZN63lRMyh48wCuIgYs"
                alt="Corporate Wellness Dashboard"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Divider before product grid */}
      <div className="w-full flex justify-center mb-8">
        <div className="w-24 h-1 bg-emerald-100 rounded-full"></div>
      </div>
    </>
  );
};
