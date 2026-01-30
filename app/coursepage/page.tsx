
"use client"
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function GutHealthCourse() {
      const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950">
      {/* Header Section */}
      <div className="grid md:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto">
        {/* Left Column - Course Info */}
        <div className="text-white space-y-6">
          <h1 className="text-4xl font-bold mb-4">
            Gut Health & Stress Resilience: Professionals
          </h1>
          
          <p className="text-green-100 leading-relaxed">
            This engaging course empowers corporate employees to harness the power of gut health for
            enhancing daily energy, focus, and resilience against stress. Through accessible videos and
            informative articles, participants will explore the connection between modern lifestyles and gut issues,
            dispel common myths, and adopt practical microhabits for better digestion and overall wellness.
            Designed for busy professionals, this evidence-informed program emphasizes awareness and
            prevention, enabling individuals to take charge of their health amidst the demands of the workplace.
          </p>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
              SY
            </div>
            <div>
              <p className="text-sm text-green-200">Created by</p>
              <p className="font-medium">Simran Yadav</p>
            </div>
            
          </div>
           <div className="bg-green-50 py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course objectives</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">•</span>
              <span>Understand what gut health is and why it matters for daily performance.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">•</span>
              <span>Recognize how modern lifestyle and workplace stress impact digestion.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">•</span>
              <span>Identify common gut health myths versus facts.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">•</span>
              <span>Apply simple, realistic microhabits to support gut health.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">•</span>
              <span>Utilize stress management techniques to enhance overall well-being.</span>
            </li>
          </ul>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills and Knowledge</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-emerald-900 text-white hover:bg-emerald-800 px-4 py-2">
                gut health
              </Badge>
              <Badge variant="secondary" className="bg-emerald-900 text-white hover:bg-emerald-800 px-4 py-2">
                stress management
              </Badge>
              <Badge variant="secondary" className="bg-emerald-900 text-white hover:bg-emerald-800 px-4 py-2">
                corporate wellness
              </Badge>
              <Badge variant="secondary" className="bg-emerald-900 text-white hover:bg-emerald-800 px-4 py-2">
                microhabits
              </Badge>
              <Badge variant="secondary" className="bg-emerald-900 text-white hover:bg-emerald-800 px-4 py-2">
                digestion
              </Badge>
            </div>
          </div>
        </div>
      </div>
        </div>

        {/* Right Column - Course Card */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md bg-white shadow-2xl overflow-hidden">
            {/* Course Image */}
            <div className="relative bg-gradient-to-br from-emerald-600 to-green-700 p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center text-white">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-emerald-500/30 flex items-center justify-center">
                  <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-sm bg-emerald-800/50 px-3 py-1 rounded inline-block">
                  Captured screenshot
                </p>
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              <h2 className="font-bold text-lg text-gray-900">
                Gut Health & Stress Resilience: Professionals
              </h2>
              
             

              <p className="text-sm text-gray-600">by Simran Yadav</p>

              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Result:</span> Complete
                </p>
                <p className="text-sm">
                  <span className="font-medium">Grade:</span> 100%
                </p>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">4</span>
              </div>

              <Button className="w-full bg-emerald-900 hover:bg-emerald-800 text-white py-6"
              onClick={() => router.push("/course")}>
                Start
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Objectives Section */}
     
    </div>
  );
}