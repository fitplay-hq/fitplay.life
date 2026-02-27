"use client";
import React from "react";
import Image from "next/image";
import { Clock, Stethoscope } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import Digestive from "../../../public/digestive.svg";

interface AssessmentSectionProps {
  quizzes: any[];
  requirePaywallOrAction: (type: string, action: () => void) => void;
  setOpen: (open: boolean) => void;
  loadQuiz: () => void;
}

export const AssessmentSection = ({
  quizzes,
  requirePaywallOrAction,
  setOpen,
  loadQuiz,
}: AssessmentSectionProps) => {
  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-3xl border border-emerald-100 p-8 shadow-md shadow-emerald-50/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100/50">
      <SectionHeader
        icon={Stethoscope}
        pillText="Assessment"
        title="Health Assessment"
        description="Take our expert-designed assessment to understand your health better"
      />
      <div className="space-y-6 flex-grow">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-emerald-50 hover:shadow-md transition-all duration-300 group"
          >
            <div className="relative w-full h-48 bg-emerald-50/50 aspect-auto overflow-hidden">
              {quiz.image ? (
                <Image
                  src={quiz.image}
                  alt={quiz.title}
                  fill
                  className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${quiz.color} opacity-10 flex items-center justify-center`}
                >
                  <Stethoscope className="w-12 h-12 text-emerald-600 opacity-20" />
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div
                className={`w-14 h-14 bg-gradient-to-r ${quiz.color} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
              >
                <Image
                  src={Digestive}
                  alt="Assessment"
                  className="w-7 h-7 sm:w-5 sm:h-5 invert"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {quiz.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                {quiz.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 py-4 border-t border-emerald-50">
                <div className="flex items-center gap-1 font-medium">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  {quiz.duration}
                </div>
              </div>
              <button
                onClick={() => {
                  requirePaywallOrAction("quiz", () => {
                    setOpen(true);
                    loadQuiz();
                  });
                }}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transform active:scale-95 transition-all duration-300 mt-auto"
              >
                Start
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
