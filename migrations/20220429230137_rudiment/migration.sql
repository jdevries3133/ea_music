-- CreateTable
CREATE TABLE "RudimentUnlocked" (
    "id" SERIAL NOT NULL,
    "rudimentId" INTEGER NOT NULL,
    "homeroom" TEXT NOT NULL,

    CONSTRAINT "RudimentUnlocked_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RudimentUnlocked_rudimentId_homeroom_key" ON "RudimentUnlocked"("rudimentId", "homeroom");
