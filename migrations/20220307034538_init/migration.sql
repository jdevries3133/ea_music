-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "studentName" TEXT NOT NULL,
    "browserFingerprint" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voter_name" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    "loser" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);
