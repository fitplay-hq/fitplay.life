"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Apple,
  Dumbbell,
  Heart,
  Stethoscope,
  Coffee,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const categories = [
  {
    icon: Dumbbell,
    title: "Fitness & Gym Equipment",
    description: "Premium equipment for your fitness journey",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Apple,
    title: "Nutrition & Health",
    description: "Supplements and healthy nutrition",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Stethoscope,
    title: "Diagnostics & Preventive Health",
    description: "Comprehensive health screenings",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
  },
  {
    icon: Coffee,
    title: "Ergonomic & Workspace Comfort",
    description: "Comfortable workspace solutions",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50",
  },
  {
    icon: Heart,
    title: "Health & Wellness Services",
    description: "Mental wellness and therapy",
    color: "from-blue-500 to-emerald-500",
    bgColor: "bg-blue-50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function CategoriesWeOffer() {
  return (
    <section className="py-24 bg-white mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Categories We Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive wellness solutions across multiple categories
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={scaleVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/store">
                <Card
                  className={`group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden cursor-pointer ${category.bgColor} h-full`}
                >
                  <CardContent className="p-8 h-full flex flex-col">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                    >
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 flex-grow">
                      {category.description}
                    </p>
                    <div className="mt-6 flex items-center text-emerald-600 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="font-medium">Explore</span>
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
