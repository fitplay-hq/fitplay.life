"use client";
import React from "react";
import { Star, ArrowRight, Video } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export interface ConsultationSectionProps {
  consultations: any[];
  requirePaywallOrAction: (type: string, action: () => void) => void;
  setShowCalendly: (open: boolean) => void;
}

export const ConsultationSection = ({
  consultations,
  requirePaywallOrAction,
  setShowCalendly,
}: ConsultationSectionProps) => {
  return (
    <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-3xl border border-emerald-100 p-8 shadow-md shadow-emerald-50/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-100/50">
      <SectionHeader
        icon={Video}
        pillText="Consultation"
        title="Consultation"
        description="Consultation By Health Experts"
      />
      <div className="space-y-6">
        {consultations.map((consultation, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100
                 hover:shadow-md transition-all duration-300 group cursor-pointer"
            onClick={() =>
              requirePaywallOrAction("consultation", () =>
                setShowCalendly(true)
              )
            }
          >
            <div className="relative h-auto bg-gradient-to-br from-emerald-100 to-teal-100 overflow-hidden">
              <img
                src={consultation.image || "/placeholder.png"}
                alt={consultation.name}
                className="w-full h-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                {consultation.name}
              </h3>

              <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                {consultation.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    requirePaywallOrAction("consultation", () =>
                      setShowCalendly(true)
                    );
                  }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transform active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Take Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
