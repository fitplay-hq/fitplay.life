"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          background: `
            linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 25%, rgba(4, 120, 87, 0.9) 50%, rgba(6, 95, 70, 0.9) 75%, rgba(8, 84, 60, 0.9) 100%),
            radial-gradient(circle at 20% 50%, rgba(52, 211, 153, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(20, 184, 166, 0.2) 0%, transparent 50%),
            linear-gradient(45deg, #064e3b 0%, #065f46 25%, #047857 50%, #059669 75%, #10b981 100%)
          `,
        }}
      >
        <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-6 h-6 bg-emerald-300/30 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-20 w-5 h-5 bg-white/15 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-40 w-3 h-3 bg-emerald-200/40 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-60 left-1/3 w-2 h-2 bg-white/25 rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 z-5"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-2xl shadow-black/80"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
          >
            Ready to Transform Your Employee Wellness?
          </h2>
          <p
            className="text-white text-lg md:text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-xl"
            style={{ textShadow: "1px 1px 6px rgba(0,0,0,0.8)" }}
          >
            Join hundreds of companies making employee wellness simple and
            effective
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-10">
            <Link href="/coming-soon">
              <Button
                size="lg"
                className="bg-emerald-500 text-white hover:bg-emerald-600 px-10 py-6 text-xl font-bold shadow-2xl hover:scale-110 hover:shadow-emerald-500/50 transition-all duration-300 rounded-full border-2 border-emerald-400 drop-shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            <Link href="/support">
              <Button
                size="lg"
                variant="outline"
                className="border-3 border-white text-white hover:bg-white/30 bg-white/20 px-10 py-6 text-xl font-bold backdrop-blur-md hover:scale-110 transition-all duration-300 rounded-full shadow-2xl drop-shadow-xl"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
