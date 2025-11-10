"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Dumbbell,
  Apple,
  Stethoscope,
  Users,
  CreditCard,
  ShoppingBag,
  Award,
  Star,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Building2,
  Sparkles,
  Target,
  Activity,
  Coffee,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FloatingElements from "@/components/FloatingElements";
import HeroIllustration from "@/components/HeroIllustration";
import Link from "next/link";
import Hero from '@/components/Hero';

export default function HomePage() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  // Network of Companies
  const partnerCompanies = [
    { name: 'Zomato', logo: 'https://logo.clearbit.com/zomato.com' },
    { name: 'Swiggy', logo: 'https://logo.clearbit.com/swiggy.com' },
    { name: 'Paytm', logo: 'https://logo.clearbit.com/paytm.com' },
    { name: 'Flipkart', logo: 'https://logo.clearbit.com/flipkart.com' },
    { name: 'Ola', logo: 'https://images.seeklogo.com/logo-png/30/1/ola-logo-png_seeklogo-306525.png' },
    { name: 'Byju\'s', logo: 'https://logo.clearbit.com/byjus.com' },
    { name: 'Razorpay', logo: 'https://logo.clearbit.com/razorpay.com' },
    { name: 'Freshworks', logo: 'https://logo.clearbit.com/freshworks.com' }
  ];

  // Categories We Offer
  const categories = [
    {
      icon: Dumbbell,
      title: 'Fitness & Gym Equipment',
      description: 'Premium equipment for your fitness journey',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Apple,
      title: 'Nutrition & Health',
      description: 'Supplements and healthy nutrition',
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Stethoscope,
      title: 'Diagnostics & Preventive Health',
      description: 'Comprehensive health screenings',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50'
    },
    {
      icon: Coffee,
      title: 'Ergonomic & Workspace Comfort',
      description: 'Comfortable workspace solutions',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50'
    },
    {
      icon: Heart,
      title: 'Health & Wellness Services',
      description: 'Mental wellness and therapy',
      color: 'from-blue-500 to-emerald-500',
      bgColor: 'bg-blue-50'
    }
  ];

  // Why FitPlay
  const whyFitplay = [
    {
      icon: Target,
      title: 'One Platform For All',
      description: 'Unified solution for all corporate wellness needs, streamlining health benefits management',
      color: 'text-emerald-600'
    },
    {
      icon: Trophy,
      title: 'Curated Vendors & Exclusive Pricing',
      description: 'Partnerships with premium brands offering exclusive rates and guaranteed quality',
      color: 'text-green-600'
    },
    {
      icon: Activity,
      title: 'Seamless Dashboards',
      description: 'Intuitive interfaces for HR teams and employees, making wellness management effortless',
      color: 'text-teal-600'
    }
  ];

  // Trusted Wellness Partners
  const wellnessPartners = [
    { name: 'Cult.fit', category: 'Fitness', logo: 'https://logo.clearbit.com/cure.fit' },
    { name: 'HealthKart', category: 'Nutrition', logo: 'https://logo.clearbit.com/healthkart.com' },
    { name: 'Thyrocare', category: 'Diagnostics', logo: 'https://logo.clearbit.com/thyrocare.com' },
    { name: 'Practo', category: 'Mental Health', logo: 'https://logo.clearbit.com/practo.com' },
    { name: 'Decathlon', category: 'Equipment', logo: 'https://logo.clearbit.com/decathlon.com' },
    { name: 'MediBuddy', category: 'Services', logo: 'https://logo.clearbit.com/medibuddy.in' },
    { name: '1mg', category: 'Wellness', logo: 'https://logo.clearbit.com/1mg.com' },
    { name: 'Nykaa', category: 'Beauty & Wellness', logo: 'https://logo.clearbit.com/nykaa.com' }
  ];

  const wellnessDomains = [
    {
      icon: Dumbbell,
      title: "Fitness & Exercise",
      description:
        "Access gym memberships, fitness equipment, and workout programs",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Apple,
      title: "Nutrition & Wellness",
      description:
        "Healthy meal plans, supplements, and nutrition consultations",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Stethoscope,
      title: "Preventive Care",
      description: "Health screenings, check-ups, and diagnostic services",
      color: "bg-teal-50 text-teal-600",
    },
    {
      icon: Heart,
      title: "Mental Wellness",
      description:
        "Stress management, therapy sessions, and mindfulness programs",
      color: "bg-cyan-50 text-cyan-600",
    },
  ];

  const featuredOffers = [
    {
      id: 1,
      title: "Premium Gym Membership",
      brand: "FitZone",
      originalPrice: "₹7,999",
      credits: 200,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "Organic Protein Powder",
      brand: "NutriMax",
      originalPrice: "₹6,999",
      credits: 150,
      image:
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "Health Screening Package",
      brand: "WellCare Labs",
      originalPrice: "₹15,999",
      credits: 300,
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const brands = [
    "FitZone",
    "NutriMax",
    "WellCare Labs",
    "FlexFit",
    "HealthPlus",
    "VitalLife",
  ];

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

  const testimonials = [
    {
      quote:
        "FitPlay made it so easy for our team to access wellness benefits. The credit system is straightforward, and our employees actually use it regularly.",
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "TechCorp",
      image:
        "https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=fff",
      rating: 5,
    },
    {
      quote:
        "Finally, a wellness platform that our employees love. The product selection is great and the ordering process is seamless.",
      name: "Arjun Patel",
      role: "Marketing Manager", 
      company: "StartupX",
      image:
        "https://ui-avatars.com/api/?name=Arjun+Patel&background=059669&color=fff",
      rating: 5,
    },
    {
      quote:
        "We've seen a 40% increase in wellness benefit utilization since switching to FitPlay. Our employees appreciate the flexibility.",
      name: "Meera Singh",
      role: "HR Director",
      company: "InnovateLab",
      image:
        "https://ui-avatars.com/api/?name=Meera+Singh&background=047857&color=fff",
      rating: 5,
    },
  ];

  return (
    <div className="space-y-8 md:space-y-12">
      {/* New Hero Section from src */}
      <Hero/>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Trust Indicators */}
          <div className="mt-20 text-center">
            <p className="text-gray-600 text-lg mb-8">
              Trusted by employees at leading companies worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              {[
                "TechCorp",
                "StartupX",
                "InnovateLab",
                "FutureTech",
                "DataSoft",
              ].map((company, index) => (
                <div key={index} className="text-gray-500 font-medium text-xl">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Network of Companies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-gray-600">
              Join the network of companies transforming employee wellness
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {partnerCompanies.map((company, index) => (
              <motion.div
                key={index}
                variants={scaleVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 p-3 shadow-sm">
                    <img 
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">${company.name.charAt(0)}</div>`;
                      }}
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-700">{company.name}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-green-50/50 to-teal-50 relative overflow-hidden">
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
                {/* Connector Line */}
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
                  className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-emerald-500 shadow-lg">
                      <span className="text-emerald-600 font-bold text-xl">{step.step}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-primary mb-4">{step.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories We Offer */}
      <section className="py-24 bg-white">
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
                  <Card className={`group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden cursor-pointer ${category.bgColor}`}>
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-3">{category.title}</h3>
                      <p className="text-gray-600">{category.description}</p>
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

       {/* Why FitPlay */}
      <section className="py-24 bg-gradient-to-br from-emerald-900 to-green-800 text-white relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why FitPlay?
            </h2>
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
                <p className="text-emerald-100 text-lg leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trusted Wellness Partners */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Trusted Wellness Partners
            </h2>
            <p className="text-xl text-gray-600">
              We partner with leading brands to bring you the best in wellness
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {wellnessPartners.map((partner, index) => (
              <motion.div
                key={index}
                variants={scaleVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 p-4 shadow-sm">
                  <img 
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center"><svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>`;
                    }}
                  />
                </div>
                <div className="font-bold text-gray-900 mb-1">{partner.name}</div>
                <div className="text-sm text-emerald-600">{partner.category}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>     

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Voices of Transformation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we are revolutionizing wellness experiences for employees across leading organizations
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white hover:shadow-2xl transition-all duration-300 border-0 h-full">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                          >
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="pt-4 border-t border-gray-100">
                        <div className="font-bold text-primary text-lg">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                        <div className="text-sm text-emerald-600 font-medium">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Employee Wellness?
            </h2>
            <p className="text-emerald-50 text-lg max-w-2xl mx-auto leading-relaxed">
              Join hundreds of companies making employee wellness simple and effective
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link href="/partner">
                <Button 
                  size="lg" 
                  className="bg-white text-emerald-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold shadow-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/support">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 bg-transparent px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
