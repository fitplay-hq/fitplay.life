"use client";
import React from "react";
import { AssessmentSection } from "./AssessmentSection";
import { CourseSection } from "./CourseSection";
import { ConsultationSection } from "./ConsultationSection";

export interface WellnessServicesProps {
  quizzes: any[];
  courses: any[];
  consultations: any[];
  courseProgress: any;
  isLoadingProgress: boolean;
  getButtonContent: () => any;
  requirePaywallOrAction: (type: string, action: () => void) => void;
  setOpen: (open: boolean) => void;
  loadQuiz: () => void;
  setShowCalendly: (open: boolean) => void;
}

export function WellnessServices(props: WellnessServicesProps) {
  return (
    <section
      className="relative w-full py-20 bg-emerald-50/20 overflow-hidden"
      id="assessment"
    >
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wide uppercase mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Wellness Services
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Fuel Your Wellness Journey
          </h2>
          <p className="text-base md:text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Expert-led assessments, transformative courses, and professional
            consultations designed to elevate your health and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          <AssessmentSection
            quizzes={props.quizzes}
            requirePaywallOrAction={props.requirePaywallOrAction}
            setOpen={props.setOpen}
            loadQuiz={props.loadQuiz}
          />
          <CourseSection
            courses={props.courses}
            courseProgress={props.courseProgress}
            isLoadingProgress={props.isLoadingProgress}
            getButtonContent={props.getButtonContent}
            requirePaywallOrAction={props.requirePaywallOrAction}
          />
          <ConsultationSection
            consultations={props.consultations}
            requirePaywallOrAction={props.requirePaywallOrAction}
            setShowCalendly={props.setShowCalendly}
          />
        </div>
      </div>
    </section>
  );
}

// Re-exporting if needed for backward compatibility or shared usage
export { ProductCardSkeleton } from "./ProductCardSkeleton";
