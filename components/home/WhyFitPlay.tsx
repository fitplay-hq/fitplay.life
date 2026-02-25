"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Trophy, Activity } from "lucide-react";

const whyFitplay = [
  {
    icon: Target,
    title: "One Platform For All",
    description:
      "Unified solution for all corporate wellness needs, streamlining health benefits management",
    color: "text-emerald-600",
  },
  {
    icon: Trophy,
    title: "Curated Vendors & Exclusive Pricing",
    description:
      "Partnerships with premium brands offering exclusive rates and guaranteed quality",
    color: "text-green-600",
  },
  {
    icon: Activity,
    title: "Seamless Dashboards",
    description:
      "Intuitive interfaces for HR teams and employees, making wellness management effortless",
    color: "text-teal-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WhyFitPlay() {
  return (
    <section className="py-24 bg-gradient-to-br from-emerald-900 to-green-800 text-white relative overflow-hidden mb-0">
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why FitPlay?</h2>
          <p className="text-lg text-emerald-100">
            The complete solution for corporate wellness excellence
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {whyFitplay.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
                <reason.icon className={`w-8 h-8 ${reason.color}`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{reason.title}</h3>
              <p className="text-emerald-100 text-lg leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
