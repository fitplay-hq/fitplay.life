"use client";

import React from "react";
import { motion } from "framer-motion";
import { CreditCard, ShoppingBag, Award } from "lucide-react";

const howItWorksSteps = [
  {
    step: "1",
    icon: CreditCard,
    title: "Receive Credits",
    description:
      "Your company provides wellness credits to spend on health and fitness products",
  },
  {
    step: "2",
    icon: ShoppingBag,
    title: "Browse & Purchase",
    description:
      "Explore our curated wellness store and purchase products using your credits",
  },
  {
    step: "3",
    icon: Award,
    title: "Track & Redeem",
    description:
      "Monitor your orders, track benefits, and enjoy your wellness journey",
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

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-br from-emerald-50 via-green-50/50 to-teal-50 relative overflow-hidden mb-0">
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Get started with your wellness journey in three simple steps
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-12 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
            >
              {index < howItWorksSteps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-1 bg-gradient-to-r from-emerald-300 to-green-300 rounded-full z-0">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                  />
                </div>
              )}

              <motion.div
                className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full flex flex-col"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-emerald-500 shadow-lg">
                    <span className="text-emerald-600 font-bold text-xl">
                      {step.step}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-primary mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed flex-grow">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
