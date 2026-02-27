"use client";
import React from "react";
import { PricingCard } from "./PricingCard";
import { eliteFeatures, starterFeatures } from "./pricing-data";
import { motion } from "framer-motion";

export const PricingSection = () => {
  return (
    <section className="relative w-full py-20 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-gray-50 to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold tracking-wide uppercase mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Pricing Plans
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Transform Your Gut Health
          </h2>
          <p className="text-base md:text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Choose the perfect plan tailored for your wellness journey and
            achieve the peak performance you deserve.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-center gap-12 lg:gap-20 relative mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-[340px] flex"
          >
            <PricingCard
              type="Starter"
              titlePrefix="GUT PASS"
              titleHighlight="STARTER PLAN"
              price="₹4999/-"
              tagline="Gut first health for high performing individuals!"
              features={starterFeatures}
              isPremium={false}
              href="/product/baaa50cf-ccdf-4473-b0ec-df11d0d55ad8"
            />
          </motion.div>

          {/* Central divider for desktop */}
          {/* Removed as per instruction to simplify visual busyness */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-[340px] flex"
          >
            <PricingCard
              type="Elite"
              titlePrefix="GUT PASS"
              titleHighlight="ELITE PLAN"
              price="₹9999/-"
              tagline="Gut first health for high performing individuals!"
              features={eliteFeatures}
              isPremium={true}
              href="/product/01515b59-8fa7-4347-a0cf-f404e471c8ec"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
