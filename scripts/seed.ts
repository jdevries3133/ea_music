import { PrismaClient } from "@prisma/client";

(async () => {
  const prisma = new PrismaClient();

  await prisma.rudimentUnlocked.createMany({
    data: [
      { homeroom: "4A", rudimentId: 1 },
      { homeroom: "4A", rudimentId: 3 },
      { homeroom: "4A", rudimentId: 7 },
      { homeroom: "4A", rudimentId: 8 },
      { homeroom: "4A", rudimentId: 9 },
      { homeroom: "6E", rudimentId: 2 },
      { homeroom: "6E", rudimentId: 6 },
      { homeroom: "6E", rudimentId: 4 },
      { homeroom: "6E", rudimentId: 7 },
      { homeroom: "6E", rudimentId: 1 },
      { homeroom: "7B", rudimentId: 3 },
    ],
  });
  console.log("created rudimientUnlocked events");
})();
