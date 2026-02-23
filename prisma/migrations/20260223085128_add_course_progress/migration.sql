-- CreateTable
CREATE TABLE "WellnessCourseProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isEnrolled" BOOLEAN NOT NULL DEFAULT false,
    "completedModules" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "currentSection" INTEGER NOT NULL DEFAULT 0,
    "currentModule" INTEGER NOT NULL DEFAULT 0,
    "enrolledAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WellnessCourseProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WellnessCourseProgress_userId_key" ON "WellnessCourseProgress"("userId");

-- AddForeignKey
ALTER TABLE "WellnessCourseProgress" ADD CONSTRAINT "WellnessCourseProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
