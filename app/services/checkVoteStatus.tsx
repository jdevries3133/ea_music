import { User } from "@prisma/client";

import prisma from "~/prisma";
import listPosters from "~/services/listPosters";
import filterPosters from "~/utils/filterPosters";
import { students } from "~/utils/students";

export type VoteStatus = {
  votesRemaining: boolean;
  categories: {
    homeroom: string[];
    grade: string[];
    school: string[];
  };
};

export const checkVoteStatus = async (user: User): Promise<VoteStatus> => {
  // fetch information
  const student = students.find((s) => s.name === user.studentName);
  if (!student) {
    throw new Error("student not found");
  }
  const homeroom = student.homeroom;
  const grade = homeroom.slice(0, 1);

  const seen = await prisma.vote.findMany({
    where: {
      Voter: {
        id: user.id,
      },
    },
  });
  const allPosters = filterPosters(await listPosters());

  // parse information
  const seenWinnersSchool = seen
    .filter((v) => v.type === "SCHOOL")
    .map((i) => i.winner);
  const remainingChoicesSchool = allPosters.all.filter(
    (i) => !seenWinnersSchool.includes(i)
  );

  const seenWinnersGrade = seen
    .filter((v) => v.type === "GRADE")
    .map((i) => i.winner);
  const remainingChoicesGrade = allPosters.gradeLevel[grade].filter(
    (i) => !seenWinnersGrade.includes(i)
  );

  const seenWinnersHomeroom = seen
    .filter((v) => v.type === "HOMEROOM")
    .map((i) => i.winner);
  const remainingChoicesHomeroom = allPosters.homeroom[homeroom].filter(
    (i) => !seenWinnersHomeroom.includes(i)
  );
  debugger;

  let votesRemaining: boolean = false;
  if (
    remainingChoicesHomeroom.length > 0 ||
    remainingChoicesGrade.length > 0 ||
    remainingChoicesSchool.length > 0
  ) {
    votesRemaining = true;
  }
  return {
    votesRemaining,
    categories: {
      homeroom: remainingChoicesHomeroom,
      grade: remainingChoicesGrade,
      school: remainingChoicesSchool,
    },
  };
};
