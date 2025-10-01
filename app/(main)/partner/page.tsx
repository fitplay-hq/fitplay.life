"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Building2,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  Star,
  Shield,
  Zap,
  Clock,
  HeartHandshake,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export default function PartnerWithUs() {
  const [contactForm, setContactForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    employeeCount: "",
    industry: "",
    currentProgram: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Partnership inquiry submitted:", contactForm);
    // Reset form
    setContactForm({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      employeeCount: "",
      industry: "",
      currentProgram: "",
      message: "",
    });
    alert(
      "Thank you for your interest! Our team will contact you within 24 hours."
    );
  };

  const aboutStats = [
    { icon: Building2, number: "50+", label: "Corporate Partners" },
    { icon: Users, number: "10,000+", label: "Active Employees" },
    { icon: Target, number: "95%", label: "Employee Engagement" },
    { icon: TrendingUp, number: "1000+", label: "Wellness Products" },
  ];

  const services = [
    {
      icon: Shield,
      title: "Curated Wellness Marketplace",
      description:
        "Access to premium health products, diagnostics, and wellness services from verified vendors.",
      features: [
        "Health screenings",
        "Fitness equipment",
        "Nutrition supplements",
        "Mental wellness programs",
      ],
    },
    {
      icon: Zap,
      title: "Smart Points System",
      description:
        "Flexible credit allocation system that allows employees to redeem company points for wellness products.",
      features: [
        "Customizable credit limits",
        "Real-time tracking",
        "Automated allocation",
        "Usage analytics",
      ],
    },
    {
      icon: Clock,
      title: "Comprehensive Analytics",
      description:
        "Detailed insights into employee wellness engagement and program effectiveness.",
      features: [
        "Engagement metrics",
        "Health outcomes tracking",
        "ROI measurement",
        "Custom reports",
      ],
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Support",
      description:
        "Full-service support including implementation, training, and ongoing customer success.",
      features: [
        "24/7 customer support",
        "Training sessions",
        "Account management",
        "Technical assistance",
      ],
    },
  ];

  const benefits = [
    "Improve employee health and wellness outcomes",
    "Increase employee satisfaction and retention",
    "Reduce healthcare costs and absenteeism",
    "Easy implementation with existing HR systems",
    "Comprehensive analytics and reporting",
    "Scalable solution for companies of all sizes",
    "Expert customer support and account management",
    "Flexible pricing models to fit your budget",
  ];

  const testimonials = [
    {
      company: "TechCorp India",
      industry: "Technology",
      employees: "500+",
      quote:
        "FitPlay has transformed our employee wellness program. The engagement rates have increased by 300% since implementation.",
      name: "Priya Sharma",
      role: "HR Director",
      image:
        "https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=fff",
    },
    {
      company: "Manufacturing Plus",
      industry: "Manufacturing",
      employees: "1200+",
      quote:
        "The analytics and reporting features help us track ROI effectively. Our employees love the variety of wellness options.",
      name: "Rajesh Kumar",
      role: "Chief People Officer",
      image:
        "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10b981&color=fff",
    },
    {
      company: "Finance Solutions",
      industry: "Financial Services",
      employees: "800+",
      quote:
        "Implementation was seamless and the support team is exceptional. Highly recommend for any corporate wellness program.",
      name: "Anitha Reddy",
      role: "VP Human Resources",
      image:
        "https://ui-avatars.com/api/?name=Anitha+Reddy&background=10b981&color=fff",
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-green-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-emerald-100 text-emerald-800">
                Partner with FitPlay
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-primary">
                Transform Your Employee
                <br />
                <span className="text-emerald-600">Wellness Program</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Join India&apos;s leading corporate wellness marketplace and
                provide your employees with access to premium health products,
                diagnostics, and wellness services through smart rewards.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={() =>
                  document
                    .getElementById("contact-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Book a Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
              >
                Download Brochure
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              {aboutStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About FitPlay */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl text-primary">
                About FitPlay
              </h2>
              <p className="text-lg text-gray-600">
                FitPlay is India&apos;s premier B2B wellness marketplace,
                designed exclusively for corporate employee wellness programs.
                We bridge the gap between companies wanting to invest in
                employee health and employees seeking convenient access to
                premium wellness products and services.
              </p>
              <p className="text-gray-600">
                Our platform enables companies to allocate wellness credits to
                employees, who can then redeem these credits for curated health
                products, diagnostic tests, fitness equipment, nutrition
                supplements, and preventive care services from verified vendors.
              </p>
              <div className="space-y-3">
                <h3 className="font-medium text-primary">Our Mission</h3>
                <p className="text-gray-600">
                  To make corporate wellness programs more engaging, effective,
                  and accessible by providing employees with the freedom to
                  choose wellness solutions that best fit their individual
                  needs.
                </p>
              </div>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Corporate wellness team"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-primary mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive wellness solutions designed to maximize employee
              engagement and health outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-medium text-primary">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">{service.description}</p>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-primary mb-4">
              Why Choose FitPlay?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the benefits of a comprehensive, easy-to-implement
              corporate wellness solution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-primary mb-4">
              What Our Partners Say
            </h2>
            <p className="text-gray-600">
              Hear from HR leaders who have transformed their wellness programs
              with FitPlay
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-primary">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <div className="text-sm text-gray-600">
                        {testimonial.company}
                      </div>
                      <div className="text-xs text-gray-500">
                        {testimonial.industry} • {testimonial.employees}{" "}
                        employees
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-primary mb-4">
              Ready to Transform Your Wellness Program?
            </h2>
            <p className="text-gray-600">
              Get in touch with our team to schedule a demo and learn how
              FitPlay can benefit your organization
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company Name *
                    </label>
                    <Input
                      value={contactForm.companyName}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          companyName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Contact Name *
                    </label>
                    <Input
                      value={contactForm.contactName}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          contactName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <Input
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          phone: e.target.value,
                        })
                      }
                      type="tel"
                      pattern="[0-9]{10}"
                      title="Phone number must be exactly 10 digits"
                      placeholder="Enter 10-digit phone number"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Number of Employees
                    </label>
                    <Select
                      value={contactForm.employeeCount}
                      onValueChange={(value) =>
                        setContactForm({ ...contactForm, employeeCount: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-50">1-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">
                          201-500 employees
                        </SelectItem>
                        <SelectItem value="501-1000">
                          501-1000 employees
                        </SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Industry
                    </label>
                    <Select
                      value={contactForm.industry}
                      onValueChange={(value) =>
                        setContactForm({ ...contactForm, industry: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">
                          Financial Services
                        </SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="manufacturing">
                          Manufacturing
                        </SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Current Wellness Program
                  </label>
                  <Select
                    value={contactForm.currentProgram}
                    onValueChange={(value) =>
                      setContactForm({ ...contactForm, currentProgram: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Do you have an existing wellness program?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No existing program</SelectItem>
                      <SelectItem value="basic">
                        Basic wellness initiatives
                      </SelectItem>
                      <SelectItem value="comprehensive">
                        Comprehensive wellness program
                      </SelectItem>
                      <SelectItem value="looking-to-replace">
                        Looking to replace current program
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    placeholder="Tell us about your wellness goals and any specific requirements..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-emerald-500 hover:bg-emerald-600"
                >
                  Schedule Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <Mail className="w-6 h-6 text-emerald-600 mx-auto" />
              <div className="font-medium text-primary">Email Us</div>
              <div className="text-gray-600">partnerships@fitplay.life</div>
            </div>
            <div className="space-y-2">
              <Phone className="w-6 h-6 text-emerald-600 mx-auto" />
              <div className="font-medium text-primary">Call Us</div>
              <div className="text-gray-600">+91 98765 </div>
            </div>
            <div className="space-y-2">
              <MapPin className="w-6 h-6 text-emerald-600 mx-auto" />
              <div className="font-medium text-primary">Visit Us</div>
              <div className="text-gray-600">Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
