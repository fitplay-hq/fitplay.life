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
  Leaf,
  Activity,
  Coffee,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import Link from "next/link";

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
    { name: 'Zomato', logo: 'ZO' },
    { name: 'Swiggy', logo: 'SW' },
    { name: 'Paytm', logo: 'PT' },
    { name: 'Flipkart', logo: 'FK' },
    { name: 'Ola', logo: 'OL' },
    { name: 'Byju\'s', logo: 'BJ' },
    { name: 'Razorpay', logo: 'RP' },
    { name: 'Freshworks', logo: 'FW' }
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
    { name: 'Cult.fit', category: 'Fitness', logo: 'CF' },
    { name: 'HealthKart', category: 'Nutrition', logo: 'HK' },
    { name: 'Thyrocare', category: 'Diagnostics', logo: 'TC' },
    { name: 'Practo', category: 'Mental Health', logo: 'PR' },
    { name: 'Decathlon', category: 'Equipment', logo: 'DC' },
    { name: 'MediBuddy', category: 'Services', logo: 'MB' },
    { name: '1mg', category: 'Wellness', logo: '1M' },
    { name: 'MyFitness', category: 'Supplements', logo: 'MF' }
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

  const heroStats = [
    { icon: Users, number: "25,000+", label: "Happy Employees" },
    { icon: Award, number: "100+", label: "Partner Companies" },
    { icon: ShoppingBag, number: "1,000+", label: "Wellness Products" },
    { icon: TrendingUp, number: "90%", label: "Satisfaction Rate" },
  ];

  const testimonials = [
    {
      quote:
        "FitPlay has revolutionized how our employees approach wellness. The seamless integration of credits with premium health services creates an experience that genuinely transforms lives.",
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "TechCorp",
      image:
        "https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=fff",
      rating: 5,
    },
    {
      quote:
        "The variety of wellness products and the intuitive credit system helped me maintain my fitness goals effortlessly. It's like having a personal wellness concierge.",
      name: "Arjun Patel",
      role: "Marketing Manager",
      company: "StartupX",
      image:
        "https://ui-avatars.com/api/?name=Arjun+Patel&background=059669&color=fff",
      rating: 5,
    },
    {
      quote:
        "What sets FitPlay apart is the premium curation of wellness solutions. Every product feels thoughtfully selected for maximum impact on employee health.",
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
      {/* Enhanced Hero Section - Without Image */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-16 md:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-green-500 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-teal-500 rounded-full blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-12">
            <div className="space-y-8">
              <Badge className="bg-emerald-100 text-emerald-800 px-6 py-3 text-lg">
                ✨ The Future of Corporate Wellness
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-8xl text-primary max-w-6xl mx-auto leading-tight">
                Redefining Wellness
                <br />
                <span className="text-emerald-600">
                  for the Modern Workforce
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Experience the evolution of employee benefits. Our intelligent
                wellness ecosystem transforms company investments into
                personalized health journeys, delivering premium solutions that
                adapt to your unique lifestyle and aspirations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-10 py-5 text-xl"
                >
                  Begin Your Transformation
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/benefits">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-10 py-5 text-xl"
                >
                  Explore Your Benefits
                </Button>
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
              {heroStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-emerald-100">
                      <stat.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-5xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-base md:text-lg text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-lg text-gray-600">
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
                className="bg-white rounded-2xl p-6 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-3 text-white text-lg font-bold">
                    {company.logo}
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{company.name}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Featured Offers
            </h2>
            <p className="text-lg text-gray-600">
              Don't miss out on these exclusive wellness deals
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {featuredOffers.map((offer) => (
              <motion.div
                key={offer.id}
                variants={scaleVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <ImageWithFallback
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6 space-y-3">
                      <div className="text-sm text-gray-500 font-medium">{offer.brand}</div>
                      <h3 className="text-xl font-bold text-primary">{offer.title}</h3>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl text-primary font-bold">
                          {offer.credits} credits
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          {offer.originalPrice}
                        </span>
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                          Great Value
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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

  {/* Featured Brand Banner - Sova Health */}
  <section data-reveal className="py-6 bg-gradient-to-r from-emerald-500 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-4">
              <Badge className="bg-white/20 text-white border-white/30">
                Featured Wellness Partner
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Transform Your Gut Health with Sova Health
              </h2>
              <p className="text-lg text-emerald-50">
                End-to-end gut health solutions including comprehensive testing,
                personalized nutrition plans, and expert consultations to
                optimize your digestive wellness.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Comprehensive Gut Microbiome Testing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Personalized Diet Plans</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Expert Gastroenterologist Consultations</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-50"
                >
                  Explore Gut Health Solutions
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 bg-white/20"
                >
                  Book Consultation
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="text-white">
                      <h3 className="font-semibold">Sova Health</h3>
                      <p className="text-emerald-100 text-sm">
                        Gut Health Specialists
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-white">
                    <div className="text-center">
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-xs text-emerald-100">
                        Success Rate
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">10k+</div>
                      <div className="text-xs text-emerald-100">
                        Patients Helped
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="text-white text-sm ml-2">
                      4.9/5 Rating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Trusted Wellness Partners
            </h2>
            <p className="text-lg text-gray-600">
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
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-white text-lg font-bold">
                  {partner.logo}
                </div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{partner.name}</div>
                <div className="text-xs text-emerald-600 font-medium">{partner.category}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>      {/* How It Works */}
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

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Voices of Transformation
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
                      <p className="text-gray-700 leading-relaxed text-lg">"{testimonial.quote}"</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Begin Your Wellness Evolution?
            </h2>
            <p className="text-emerald-50 text-lg max-w-2xl mx-auto leading-relaxed">
              Our wellness experts are here to guide you on your transformative health journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/partner">
                <Button 
                  size="lg" 
                  className="bg-white text-emerald-600 hover:bg-gray-50 px-10 py-7 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <Sparkles className="mr-2 w-5 h-5" />
                  Partner With Us
                </Button>
              </Link>
              <Link href="/store">
                <Button 
                  size="lg" 
                  className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-10 py-7 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  Explore Wellness Store
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
