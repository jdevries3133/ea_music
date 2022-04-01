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

export const isDoneVoting = async (user: User): Promise<boolean> => {
  return !(await checkVoteStatus(user)).votesRemaining;
};

/**
 * Get information to evaluate whether or not a student is finished voting
 */
export const checkVoteStatus = async (user: User): Promise<VoteStatus> => {
  // fetch information
  const student = students.find((s) => s.name === user.studentName);
  if (!student) {
    throw new Error("student not found");
  }
  const homeroom = student.homeroom;
  const grade = homeroom.slice(0, 1);

  const allVotes = await prisma.vote.findMany({
    where: {
      Voter: {
        id: user.id,
      },
    },
  });
  const allPosters = filterPosters(await listPosters());

  // parse information
  const losersSchool = allVotes
    .filter((v) => v.type === "SCHOOL")
    .map((i) => i.loser);
  const remainingChoicesSchool = allPosters.all.filter(
    (i) => !losersSchool.includes(i)
  );

  const losersGrade = allVotes
    .filter((v) => v.type === "GRADE")
    .map((i) => i.loser);
  const remainingChoicesGrade = allPosters.gradeLevel[grade].filter(
    (i) => !losersGrade.includes(i)
  );

  const losersHomeroom = allVotes
    .filter((v) => v.type === "HOMEROOM")
    .map((i) => i.loser);
  const remainingChoicesHomeroom = allPosters.homeroom[homeroom].filter(
    (i) => !losersHomeroom.includes(i)
  );

  let votesRemaining: boolean = false;
  if (
    // when there is only one option left, we are done voting; we have a winner
    remainingChoicesHomeroom.length > 1 ||
    remainingChoicesGrade.length > 1 ||
    remainingChoicesSchool.length > 1
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
