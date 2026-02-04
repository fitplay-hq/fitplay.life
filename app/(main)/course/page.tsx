

import { Suspense } from "react";
import CourseModuleClient from "./CourseModuleClient"

export default function CoursePage() {
  return (
    <Suspense fallback={<div className="p-10">Loading course…</div>}>
      <CourseModuleClient />
    </Suspense>
  );
}
