"use client"
import React, { useState , useEffect } from 'react';
import { Heart, BookOpen, Video, ShoppingBag, ArrowRight, Check, Clock, Users, Star, Stethoscope, Brain, Activity } from 'lucide-react';
import { X } from "lucide-react";
import { useRouter } from "next/navigation";


import { MorphingText } from "@/components/ui/morphing-text"
import { useProducts } from "@/app/hooks/useProducts";
export default function SovaHealthPage() {
  const [activeTab, setActiveTab] = useState('quiz');
  const { products, isLoading, error } = useProducts();
  const router = useRouter();


  const [open, setOpen] = useState(false);

  const loadQuiz = () => {
  // Remove old script if exists (important)
  const oldScript = document.getElementById("quizell-script");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.src = "https://api.quizell.com/js/qzembed.js?v=39337";
  script.async = true;
  script.id = "quizell-script";
  script.setAttribute("data-qz-key", "yO8hZ2");

  document.body.appendChild(script);
};
useEffect(() => {
  if (!open) return;

  // wait one tick so modal DOM is ready
  const timer = setTimeout(() => {
    loadQuiz();
  }, 100);

  return () => clearTimeout(timer);
}, [open]);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  


  const quizzes = [
    {
      title: 'Gut Health Assessment',
      description: 'Discover your digestive health score',
      duration: '5 min',
      questions: 15,
      icon: Activity,
      color: 'from-emerald-500 to-teal-500'
    },
   
  ];

  const courses = [
    {
      title: 'Complete Gut Health Masterclass',
      instructor: 'Dr. Sarah Johnson',
      duration: '6 weeks',
      lessons: 24,
      students: '2.5k',
      rating: 4.9,
      price: '2999 Credits',
      image: '🌿'
    },
    {
      title: 'Microbiome & You',
      instructor: 'Dr. Michael Chen',
      duration: '4 weeks',
      lessons: 16,
      students: '1.8k',
      rating: 4.8,
      price: '1999 Credits',
      image: '🧬'
    },
    {
      title: 'Probiotic Foods & Recipes',
      instructor: 'Chef Emma Williams',
      duration: '3 weeks',
      lessons: 12,
      students: '3.2k',
      rating: 4.9,
      price: '1499 Credits',
      image: '🥗'
    }
  ];

  const consultations = [
    {
      name: 'Dr. Priya Sharma',
      specialty: 'Gastroenterologist',
      experience: '15 years',
      rating: 4.9,
      reviews: 450,
      price: '1500 Credits',
      available: 'Today',
      image: '👩‍⚕️'
    },
    {
      name: 'Dr. Rajesh Kumar',
      specialty: 'Nutritionist',
      experience: '12 years',
      rating: 4.8,
      reviews: 380,
      price: '1200 Credits',
      available: 'Tomorrow',
      image: '👨‍⚕️'
    },
    {
      name: 'Dr. Ananya Patel',
      specialty: 'Ayurvedic Specialist',
      experience: '10 years',
      rating: 4.9,
      reviews: 520,
      price: '1000 Credits',
      available: 'Today',
      image: '👩‍⚕️'
    }
  ];

 

 

  return (
    

    <>


    {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm">
          {/* Modal Card */}
          <div className="relative w-full h-[92vh] md:h-auto md:max-w-3xl bg-slate-950 rounded-t-2xl md:rounded-2xl shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h2 className="text-white font-semibold text-sm md:text-base">
                Sova Health Quiz
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Quiz Body */}
            <div className="h-full overflow-y-auto p-3 md:p-4">
              <div
                id="yO8hZ2"
                data-quizlang="en"
                className="min-h-[400px] rounded-xl border border-emerald-500/30"
              />
            </div>
          </div>
        </div>
      )}
    
  



      {/* Background only behind navbar */}
      <div className="h-24 bg-gradient-to-b from-emerald-800 to-emerald-900" />

      {/* Page content */}
      <div className="mx-auto  min-h-screen px-4 sm:px-6 lg:px-8 pb-20">
        {/* Welcome Section with Health Image */}
        <div className="max-w-7xl w-full mx-auto mt-4 mb-12">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 md:rounded-3xl rounded-xl p-8 sm:p-12 lg:p-16 shadow-xl border border-emerald-100">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                
                <MorphingText texts={["Welcome to Sova Health!", "Learn About Gut Health", "Take Gut Test Today"]} />
                <p className="md:mt-8 mt-2 text-lg text-gray-600 leading-relaxed">
                  Your personalized journey to optimal digestive wellness starts here. Expert guidance, proven methods, lasting results.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Get Started Free
                  </button>
                  <button className="px-8 py-4 bg-white text-emerald-700 rounded-xl font-semibold shadow-md hover:shadow-lg border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative">
                  <div className="w-[150px] h-[150px] md:w-64 md:h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                  <div className="relative text-9xl sm:text-[12rem] animate-float">
                    🩺
                  </div>
                  <div className="absolute -bottom-4 -right-4 text-5xl animate-bounce-slow">💚</div>
                  <div className="absolute -top-4 -left-4 text-4xl animate-float-delayed-1">🌿</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-3 border border-gray-100">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
              <button
                onClick={() => setActiveTab('quiz')}
                className={`tab-trigger ${activeTab === 'quiz' ? 'data-[state=active]' : ''}`}
                data-state={activeTab === 'quiz' ? 'active' : 'inactive'}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Quiz</span>
              </button>
              <button
                onClick={() => setActiveTab('course')}
                className={`tab-trigger ${activeTab === 'course' ? 'data-[state=active]' : ''}`}
                data-state={activeTab === 'course' ? 'active' : 'inactive'}
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Courses</span>
              </button>
              <button
                onClick={() => setActiveTab('consultation')}
                className={`tab-trigger ${activeTab === 'consultation' ? 'data-[state=active]' : ''}`}
                data-state={activeTab === 'consultation' ? 'active' : 'inactive'}
              >
                <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Consult</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="px-2 sm:px-4 lg:px-6">
              {/* Quiz Tab */}
              {activeTab === 'quiz' && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Health Assessments</h2>
                    <p className="text-gray-600">Take our expert-designed quizzes to understand your health better</p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz, index) => {
                      const Icon = quiz.icon;
                      return (
                        <div key={index} className=" bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <div className={`w-14 h-14 bg-gradient-to-r ${quiz.color} rounded-xl flex items-center justify-center mb-4`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{quiz.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {quiz.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="w-4 h-4" />
                              {quiz.questions} questions
                            </div>
                          </div>
                          <button
        onClick={() => {
          setOpen(true);
          loadQuiz();
        }}
        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Start Quiz
      </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Course Tab */}
              {activeTab === 'course' && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Expert Courses</h2>
                    <p className="text-gray-600">Learn from certified health professionals and transform your wellness</p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                      <div key={index} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 h-40 flex items-center justify-center text-8xl">
                          {course.image}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1 text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                              <Star className="w-3 h-3 fill-current" />
                              {course.rating}
                            </div>
                            <span className="text-sm text-gray-500">({course.students} students)</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {course.lessons} lessons
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-emerald-600">{course.price}</span>
                            <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-200 transition-all">
                              Enroll Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Consultation Tab */}
              {activeTab === 'consultation' && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Expert Consultations</h2>
                    <p className="text-gray-600">Book personalized sessions with certified health professionals</p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {consultations.map((doctor, index) => (
                      <div key={index} className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-4xl">
                            {doctor.image}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{doctor.name}</h3>
                            <p className="text-sm text-emerald-600 font-semibold">{doctor.specialty}</p>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Experience</span>
                            <span className="font-semibold text-gray-900">{doctor.experience}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                              <span className="font-semibold text-gray-900">{doctor.rating}</span>
                            </div>
                            <span className="text-gray-600">({doctor.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Available</span>
                            <span className="font-semibold text-emerald-600">{doctor.available}</span>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl font-bold text-emerald-600">{doctor.price}</span>
                            <span className="text-sm text-gray-500">per session</span>
                          </div>
                          <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                            Book Consultation
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
       
      

  


       {/* Recommended Products Section */}
<div className="max-w-7xl mx-auto">
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Recommended Products
        </h2>
        <p className="text-gray-600">
          Premium supplements curated by health experts
        </p>
      </div>
      <ShoppingBag className="w-8 h-8 text-emerald-600" />
    </div>
  </div>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {products.slice(0, 4).map((product) => (
      <div
        key={product.id}
        className="bg-white rounded-2xl overflow-hidden border border-gray-200
                   hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {/* Product Image */}
        <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-teal-100">
          <img
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating (optional) */}
          {product.avgRating && (
            <div className="flex items-center gap-1 mb-4">
              <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              <span className="text-sm font-medium text-gray-700">
                {product.avgRating}
              </span>
              {product.noOfReviews && (
                <span className="text-xs text-gray-500">
                  ({product.noOfReviews})
                </span>
              )}
            </div>
          )}

          {/* Action */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
           <button
  onClick={() => router.push(`/product/${product.id}`)}
  className="px-4 py-2 bg-emerald-600 text-white rounded-lg
             font-semibold hover:bg-emerald-700 transition-all
             flex items-center gap-2"
>
  Add
  <ArrowRight className="w-4 h-4" />
</button>

          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </>
  );
}

