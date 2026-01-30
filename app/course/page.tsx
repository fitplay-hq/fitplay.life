"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, Circle, ChevronLeft, ChevronRight, X, Play, BookOpen, Menu } from "lucide-react";

// Course Data Structure
const courseData = {
  title: "Gut Health & Stress Resilience for Professionals",
  sections: [
    {
      id: "intro",
      title: "Introduction",
      modules: [
        {
          id: "welcome",
          title: "Welcome",
          type: "video",
          content: {
            text: "Welcome to this comprehensive course on Gut Health and Stress Resilience. In this course, you'll discover the profound connection between your gut and brain, and learn practical strategies to enhance your overall wellness.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        }
      ]
    },
    {
      id: "gut-health",
      title: "Understanding Gut Health",
      modules: [
        {
          id: "intro-gut",
          title: "Introduction to Gut Health",
          type: "video",
          content: {
            text: "Your gut is often called your 'second brain' for good reason. Home to trillions of microorganisms, your gut microbiome plays a crucial role in digestion, immunity, mood regulation, and overall health. This module introduces you to the fascinating world of gut health and why it matters for professionals like you.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        },
        {
          id: "digestion-basics",
          title: "Basics of Digestion",
          type: "video",
          content: {
            text: "Understanding how your digestive system works is fundamental to improving your gut health. From the moment food enters your mouth to nutrient absorption and waste elimination, each step of digestion is orchestrated by a complex interplay of organs, enzymes, and beneficial bacteria.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        },
        {
          id: "microbiome",
          title: "Human Microbiome",
          type: "video",
          content: {
            text: "The human microbiome consists of trillions of microorganisms living in and on your body, with the majority residing in your gut. These microscopic allies help digest food, produce vitamins, protect against pathogens, and even influence your mood and mental health through the gut-brain axis.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        },
        {
          id: "myths-facts",
          title: "Myths vs Facts",
          type: "text",
          content: {
            text: `Let's debunk common gut health myths and establish the facts:

**Myth 1: All bacteria are bad**
Fact: Your gut contains trillions of beneficial bacteria essential for health. Only a small percentage of bacteria are harmful.

**Myth 2: Probiotics cure everything**
Fact: While probiotics can be beneficial, they're not a cure-all. Different strains serve different purposes, and whole foods often provide better results.

**Myth 3: You should detox regularly**
Fact: Your liver and kidneys naturally detoxify your body. Most commercial detox programs are unnecessary and can be harmful.

**Myth 4: Gluten is bad for everyone**
Fact: Only people with celiac disease or gluten sensitivity need to avoid gluten. For others, whole grains containing gluten can be part of a healthy diet.

**Myth 5: Stress doesn't affect digestion**
Fact: Stress significantly impacts gut health through the gut-brain axis, affecting digestion, inflammation, and microbiome composition.`
          }
        },
        {
          id: "meditation-stress",
          title: "Impact of Meditation on Stress",
          type: "video",
          content: {
            text: "Chronic stress wreaks havoc on your gut health, increasing inflammation, disrupting the microbiome balance, and impairing digestion. Meditation and mindfulness practices offer powerful tools to manage stress, reduce cortisol levels, and promote a healthier gut-brain connection.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          }
        },
        {
          id: "microhabits",
          title: "Microhabits for Improvement",
          type: "text",
          content: {
            text: `Small, consistent actions create lasting change. Here are science-backed microhabits to improve your gut health:

**Daily Habits:**
• Start your day with a glass of water
• Include fermented foods (yogurt, kefir, sauerkraut) in one meal
• Eat a rainbow of vegetables for diverse fiber
• Chew food thoroughly (20-30 times per bite)
• Take a 10-minute walk after meals

**Weekly Habits:**
• Meal prep with gut-friendly ingredients
• Try one new probiotic-rich food
• Practice mindful eating at least 3 times
• Schedule stress-relief activities

**Monthly Habits:**
• Evaluate your fiber intake and adjust
• Reflect on stress levels and coping mechanisms
• Experiment with new gut-healthy recipes
• Review and adjust your sleep schedule

**Remember:** Consistency matters more than perfection. Start with one or two habits and build from there.`
          }
        },
        {
          id: "quiz",
          title: "Take Gut Health Quiz",
          type: "text",
          content: {
            text: `Test your knowledge! Answer these questions to reinforce what you've learned:

**Question 1:** What percentage of your immune system is located in your gut?
a) 30%  b) 50%  c) 70%  d) 90%

**Question 2:** Which of these is NOT a beneficial probiotic food?
a) Kimchi  b) Processed cheese  c) Kefir  d) Miso

**Question 3:** How does chronic stress affect gut health?
a) No effect  b) Increases beneficial bacteria  c) Disrupts microbiome balance  d) Improves digestion

**Question 4:** What is the gut-brain axis?
a) A type of bacteria  b) Bidirectional communication between gut and brain  c) A digestive enzyme  d) A meditation technique

**Question 5:** Which habit supports gut health?
a) Eating quickly  b) High sugar diet  c) Diverse fiber intake  d) Skipping meals

**Answers:** 1-c, 2-b, 3-c, 4-b, 5-c

Congratulations on completing the quiz! Review any areas where you'd like to deepen your understanding.`
          }
        }
      ]
    },
    {
      id: "summary",
      title: "Summary",
      modules: [
        {
          id: "course-summary",
          title: "Summary",
          type: "text",
          content: {
            text: `Congratulations on Completing the Course!

You've successfully completed **Gut Health & Stress Resilience for Professionals**. This course helped you understand the gut–brain connection, lifestyle impacts, and practical microhabits to improve wellness.

**Key Course Objectives:**
• Understand gut health fundamentals
• Identify lifestyle and stress impacts
• Debunk gut health myths
• Apply simple wellness microhabits
• Use stress management techniques

**Next Steps:**
Implement what you've learned consistently. Small daily improvements can lead to meaningful long-term health gains. Remember:

1. Start small with 1-2 microhabits
2. Track your progress weekly
3. Be patient - gut health improvements take time
4. Listen to your body and adjust accordingly
5. Seek professional medical advice when needed

Thank you for investing in your health and wellbeing. Your gut will thank you!`
          }
        }
      ]
    }
  ]
};

export default function CourseModulePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Calculate total progress
  const totalModules = courseData.sections.reduce(
    (acc, section) => acc + section.modules.length,
    0
  );
  const progressPercentage = (completedModules.size / totalModules) * 100;

  // Get current module
  const getCurrentModule = () => {
    return courseData.sections[currentSection]?.modules[currentModule];
  };

  // Get module ID for tracking
  const getModuleId = (sectionIdx, moduleIdx) => {
    return `${courseData.sections[sectionIdx].id}-${courseData.sections[sectionIdx].modules[moduleIdx].id}`;
  };

  // Mark current module as complete and move to next
  const completeAndNext = () => {
    const moduleId = getModuleId(currentSection, currentModule);
    const newCompleted = new Set(completedModules);
    newCompleted.add(moduleId);
    setCompletedModules(newCompleted);

    goToNext();
  };

  // Navigate to next module
  const goToNext = () => {
    const currentSectionData = courseData.sections[currentSection];
    
    if (currentModule < currentSectionData.modules.length - 1) {
      setCurrentModule(currentModule + 1);
    } else if (currentSection < courseData.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentModule(0);
    }
  };

  // Navigate to previous module
  const goToPrevious = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentModule(courseData.sections[currentSection - 1].modules.length - 1);
    }
  };

  // Jump to specific module
  const jumpToModule = (sectionIdx, moduleIdx) => {
    setCurrentSection(sectionIdx);
    setCurrentModule(moduleIdx);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  // Check if module is completed
  const isModuleCompleted = (sectionIdx, moduleIdx) => {
    const moduleId = getModuleId(sectionIdx, moduleIdx);
    return completedModules.has(moduleId);
  };

  // Check if we're at the first or last module
  const isFirstModule = currentSection === 0 && currentModule === 0;
  const isLastModule =
    currentSection === courseData.sections.length - 1 &&
    currentModule === courseData.sections[currentSection].modules.length - 1;

  const currentModuleData = getCurrentModule();
  const currentModuleId = getModuleId(currentSection, currentModule);
  const isCurrentCompleted = completedModules.has(currentModuleId);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F4F9F7] via-[#EBF5F0] to-[#E1F0E8] text-[#0F3D2E]">
      {/* Sidebar - Fixed on desktop, overlay on mobile */}
      <aside
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } transition-all duration-300 bg-gradient-to-b from-[#2E6F5B] to-[#1F5845] text-white flex flex-col shadow-2xl overflow-hidden fixed  top-0 z-30 h-screen`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/5">
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 font-medium text-sm hover:text-[#1FBF84] transition-colors"
          >
            <ChevronLeft size={18} /> Course Overview
          </button>
          <X className="cursor-pointer hover:text-red-300 transition-colors lg:hidden" onClick={() => setSidebarOpen(false)} />
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="mb-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-xs font-semibold mb-2 text-[#1FBF84]">Course Progress</p>
            <Progress value={progressPercentage} className="h-2 bg-white/20" />
            <p className="text-xs mt-2 text-white/80">
              {completedModules.size} of {totalModules} modules completed
            </p>
          </div>

          {courseData.sections.map((section, sectionIdx) => (
            <div key={section.id} className="mb-4">
              <p className="text-sm font-bold mb-2 text-[#1FBF84] flex items-center gap-2">
                <BookOpen size={14} />
                {section.title}
              </p>
              {section.modules.map((module, moduleIdx) => {
                const completed = isModuleCompleted(sectionIdx, moduleIdx);
                const isCurrent =
                  sectionIdx === currentSection && moduleIdx === currentModule;

                return (
                  <div
                    key={module.id}
                    onClick={() => jumpToModule(sectionIdx, moduleIdx)}
                    className={`flex items-center justify-between text-sm px-3 py-2.5 rounded-md mb-1.5 cursor-pointer transition-all ${
                      isCurrent
                        ? "bg-[#1FBF84] text-white shadow-lg scale-105"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <span className="flex items-center gap-2 flex-1">
                      {module.type === "video" ? (
                        <Play size={12} className="flex-shrink-0" />
                      ) : (
                        <BookOpen size={12} className="flex-shrink-0" />
                      )}
                      <span className="truncate">{module.title}</span>
                    </span>
                    {completed ? (
                      <CheckCircle className="text-green-300 flex-shrink-0" size={16} />
                    ) : (
                      <Circle className="text-white/40 flex-shrink-0" size={16} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </ScrollArea>

        <div className="p-4 border-t border-white/20 bg-white/5">
          <p className="text-xs text-white/60 text-center">
            {courseData.title}
          </p>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area - With proper margin for sidebar on desktop */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 bg-white shadow-md border-b border-[#E1F0E8]">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="hover:bg-[#E1F0E8]"
              >
                <Menu size={18} />
              </Button>
            )}
            <h1 className="text-base md:text-lg font-bold text-[#0F3D2E] truncate">
              {currentModuleData?.title}
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-[#2E6F5B]">
              <Progress value={progressPercentage} className="w-20 md:w-32 h-2" />
              <span className="whitespace-nowrap">{Math.round(progressPercentage)}%</span>
            </div>
            {isLastModule && completedModules.size === totalModules ? (
              <Button className="bg-[#1FBF84] hover:bg-[#17a673] text-white shadow-lg text-sm md:text-base">
                Finish Course
              </Button>
            ) : null}
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="md:hidden px-4 py-2 bg-white border-b border-[#E1F0E8]">
          <div className="flex items-center gap-2 text-xs text-[#2E6F5B]">
            <Progress value={progressPercentage} className="flex-1 h-2" />
            <span>{Math.round(progressPercentage)}%</span>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 px-4 md:px-8 py-6">
          <Card className="max-w-4xl mx-auto shadow-xl border-2 border-[#E1F0E8] bg-white">
            <CardContent className="p-6 md:p-8 space-y-6">
              {currentModuleData?.type === "video" ? (
                <>
                  <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={currentModuleData.content.videoUrl}
                      title={currentModuleData.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="prose prose-sm md:prose-base max-w-none">
                    <p className="text-sm md:text-base leading-relaxed text-[#0F3D2E]">
                      {currentModuleData.content.text}
                    </p>
                  </div>
                </>
              ) : (
                <div className="prose prose-sm md:prose-base max-w-none">
                  <div 
                    className="text-sm md:text-base leading-relaxed text-[#0F3D2E] whitespace-pre-line"
                    dangerouslySetInnerHTML={{ 
                      __html: currentModuleData?.content.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/•/g, '•')
                    }}
                  />
                </div>
              )}

              {!isCurrentCompleted && (
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={completeAndNext}
                    className="bg-[#1FBF84] hover:bg-[#17a673] text-white shadow-lg px-8"
                  >
                    <CheckCircle size={18} className="mr-2" />
                    Mark as Complete {!isLastModule && "& Continue"}
                  </Button>
                </div>
              )}
            </CardContent>
            
          </Card>
          
        </ScrollArea>

        {/* Footer Nav - Only spans content area */}
        <div className="flex justify-between max-w-4xl  px-4 md:px-8 py-4 bg-white border-t border-[#E1F0E8] shadow-lg">
          <Button
            variant="ghost"
            onClick={goToPrevious}
            disabled={isFirstModule}
            className="disabled:opacity-50 hover:bg-[#E1F0E8] text-sm md:text-base"
          >
            <ChevronLeft size={18} /> <span className="hidden sm:inline">Previous</span>
          </Button>
          <div className="text-xs md:text-sm text-[#2E6F5B] font-medium">
            Module {currentModule + 1} of {courseData.sections[currentSection].modules.length}
          </div>
          <Button
            onClick={isCurrentCompleted ? goToNext : completeAndNext}
            disabled={isLastModule && isCurrentCompleted}
            className="bg-[#1FBF84] hover:bg-[#17a673] text-white disabled:opacity-50 text-sm md:text-base"
          >
            <span className="hidden sm:inline">{isCurrentCompleted ? "Next" : "Complete & Next"}</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}