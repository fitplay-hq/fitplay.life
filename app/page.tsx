import { ArrowRight, Heart, Dumbbell, Apple, Stethoscope, Users, CreditCard, ShoppingBag, Award, Star, CheckCircle, TrendingUp, Shield, Zap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import Link from 'next/link';

export default function HomePage() {
  const wellnessDomains = [
    {
      icon: Dumbbell,
      title: 'Fitness & Exercise',
      description: 'Access gym memberships, fitness equipment, and workout programs',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: Apple,
      title: 'Nutrition & Wellness',
      description: 'Healthy meal plans, supplements, and nutrition consultations',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Stethoscope,
      title: 'Preventive Care',
      description: 'Health screenings, check-ups, and diagnostic services',
      color: 'bg-teal-50 text-teal-600'
    },
    {
      icon: Heart,
      title: 'Mental Wellness',
      description: 'Stress management, therapy sessions, and mindfulness programs',
      color: 'bg-cyan-50 text-cyan-600'
    }
  ];

  const featuredOffers = [
    {
      id: 1,
      title: 'Premium Gym Membership',
      brand: 'FitZone',
      originalPrice: '₹7,999',
      credits: 200,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      title: 'Organic Protein Powder',
      brand: 'NutriMax',
      originalPrice: '₹6,999',
      credits: 150,
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'Health Screening Package',
      brand: 'WellCare Labs',
      originalPrice: '₹15,999',
      credits: 300,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const brands = [
    'FitZone', 'NutriMax', 'WellCare Labs', 'FlexFit', 'HealthPlus', 'VitalLife'
  ];

  const howItWorksSteps = [
    {
      step: '1',
      icon: CreditCard,
      title: 'Receive Credits',
      description: 'Your company provides wellness credits to spend on health and fitness products'
    },
    {
      step: '2',
      icon: ShoppingBag,
      title: 'Browse & Purchase',
      description: 'Explore our curated wellness store and purchase products using your credits'
    },
    {
      step: '3',
      icon: Award,
      title: 'Track & Redeem',
      description: 'Monitor your orders, track benefits, and enjoy your wellness journey'
    }
  ];

  const heroStats = [
    { icon: Users, number: '25,000+', label: 'Happy Employees' },
    { icon: Building2, number: '100+', label: 'Partner Companies' },
    { icon: ShoppingBag, number: '1,000+', label: 'Wellness Products' },
    { icon: TrendingUp, number: '90%', label: 'Satisfaction Rate' }
  ];

  const testimonials = [
    {
      quote: "FitPlay has revolutionized how our employees approach wellness. The seamless integration of credits with premium health services creates an experience that genuinely transforms lives.",
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "TechCorp",
      image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=fff"
    },
    {
      quote: "The variety of wellness products and the intuitive credit system helped me maintain my fitness goals effortlessly. It's like having a personal wellness concierge.",
      name: "Arjun Patel",
      role: "Marketing Manager",
      company: "StartupX",
      image: "https://ui-avatars.com/api/?name=Arjun+Patel&background=059669&color=fff"
    },
    {
      quote: "What sets FitPlay apart is the premium curation of wellness solutions. Every product feels thoughtfully selected for maximum impact on employee health.",
      name: "Meera Singh",
      role: "HR Director",
      company: "InnovateLab",
      image: "https://ui-avatars.com/api/?name=Meera+Singh&background=047857&color=fff"
    }
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Enhanced Hero Section - Without Image */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-24 md:py-32 overflow-hidden">
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
                <span className="text-emerald-600">for the Modern Workforce</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Experience the evolution of employee benefits. Our intelligent wellness ecosystem 
                transforms company investments into personalized health journeys, delivering 
                premium solutions that adapt to your unique lifestyle and aspirations.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/store">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-10 py-5 text-xl"
                >
                  Begin Your Transformation
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/benefits">
                <Button variant="outline" size="lg" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-10 py-5 text-xl">
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
                  <div className="text-3xl md:text-5xl font-bold text-primary">{stat.number}</div>
                  <div className="text-base md:text-lg text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 text-center">
            <p className="text-gray-600 text-lg mb-8">Trusted by employees at leading companies worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              {['TechCorp', 'StartupX', 'InnovateLab', 'FutureTech', 'DataSoft'].map((company, index) => (
                <div key={index} className="text-gray-500 font-medium text-xl">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore Wellness Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-primary mb-4">
              Explore Wellness Domains
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover comprehensive wellness solutions across multiple domains to support your health goals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wellnessDomains.map((domain, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-16 h-16 rounded-xl ${domain.color} mx-auto flex items-center justify-center`}>
                    <domain.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-primary">{domain.title}</h3>
                  <p className="text-gray-600 text-sm">{domain.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-primary mb-4">
              Featured Offers
            </h2>
            <p className="text-gray-600">
              Don't miss out on these exclusive wellness deals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredOffers.map((offer) => (
              <Card key={offer.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <ImageWithFallback
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6 space-y-3">
                    <div className="text-sm text-gray-500">{offer.brand}</div>
                    <h3 className="text-primary">{offer.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg text-primary font-bold">{offer.credits} credits</span>
                      <span className="text-sm text-gray-500 line-through">{offer.originalPrice}</span>
                      <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                        Great Value
                      </span>
                    </div>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brand Banner - Sova Health */}
      <section className="py-12 bg-gradient-to-r from-emerald-500 to-green-500">
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
                personalized nutrition plans, and expert consultations to optimize your digestive wellness.
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
                <Button variant="secondary" size="lg" className="bg-white text-emerald-600 hover:bg-gray-50">
                  Explore Gut Health Solutions
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
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
                      <p className="text-emerald-100 text-sm">Gut Health Specialists</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-white">
                    <div className="text-center">
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-xs text-emerald-100">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">10k+</div>
                      <div className="text-xs text-emerald-100">Patients Helped</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-white text-sm ml-2">4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-primary mb-4">
              Trusted Wellness Partners
            </h2>
            <p className="text-gray-600">
              We partner with leading brands to bring you the best in wellness
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold text-sm">{brand.slice(0, 2)}</span>
                </div>
                <div className="text-sm text-gray-700">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-primary mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">
              Get started with your wellness journey in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full mx-auto flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-emerald-500">
                    <span className="text-emerald-600 font-semibold text-sm">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-xl text-primary">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-primary mb-4">
              Voices of Transformation
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how FitPlay is revolutionizing wellness experiences for employees across leading organizations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic text-lg leading-relaxed">"{testimonial.quote}"</p>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-primary">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                        <div className="text-xs text-emerald-600 font-medium">{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl text-primary mb-4">
            Ready to Begin Your Wellness Evolution?
          </h2>
          <p className="text-gray-600 mb-8">
            Our wellness experts are here to guide you on your transformative health journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support">
              <Button variant="outline" size="lg" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                Connect with Experts
              </Button>
            </Link>
            <Link href="/store">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
                Explore Premium Wellness
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}