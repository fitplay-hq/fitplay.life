"use client";
import React from "react";
import Image from "next/image";
import { Star, BookOpen } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Progress } from "@/components/ui/progress";

interface CourseSectionProps {
  courses: any[];
  courseProgress: any;
  isLoadingProgress: boolean;
  getButtonContent: () => any;
  requirePaywallOrAction: (type: string, action: () => void) => void;
}

export const CourseSection = ({
  courses,
  courseProgress,
  isLoadingProgress,
  getButtonContent,
  requirePaywallOrAction,
}: CourseSectionProps) => {
  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-3xl border border-emerald-100 p-8 shadow-md shadow-emerald-50/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100/50">
      <SectionHeader
        icon={BookOpen}
        pillText="Courses"
        title="Expert Courses"
        description="Learn from certified health professionals and transform your wellness"
      />
      <div className="space-y-6">
        {courses.map((course, index) => {
          const buttonConfig = getButtonContent();
          return (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer"
              onClick={() =>
                requirePaywallOrAction("course", buttonConfig.onClick)
              }
            >
              <div className="relative w-full h-48 bg-emerald-50/50 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                    {course.rating}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
                  {course.description}
                </p>

                {courseProgress.isEnrolled && (
                  <div className="mb-4 p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center justify-between text-xs text-emerald-700 mb-2">
                      <span className="font-semibold">Your Progress</span>
                      <span className="font-bold">
                        {courseProgress.progressPercentage}%
                      </span>
                    </div>
                    <Progress
                      value={courseProgress.progressPercentage}
                      className="h-2 bg-emerald-100"
                    />
                    <p className="text-xs text-emerald-600 mt-2">
                      {courseProgress.completedModules} of{" "}
                      {courseProgress.totalModules} modules completed
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-2xl font-bold text-emerald-600">
                    {course.price}
                  </span>
                  {isLoadingProgress ? (
                    <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-lg" />
                  ) : (
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${buttonConfig.className}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        requirePaywallOrAction("course", buttonConfig.onClick);
                      }}
                    >
                      {buttonConfig.icon}
                      {buttonConfig.text}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
