import { Vote } from "@prisma/client";
import prisma from "~/prisma";
import { parsePath } from "~/utils/parsePath";

export type VotingResults = {
  allVotes: Vote[];
  // each of the following are a mapping of poster path to number of votes.
  school: Record<string, number>;
  grade: Record<string, number>;
  homeroom: Record<string, number>;
};

/**
 * Reduce an array of results into a mapping of poster names to the number
 * of winning votes that poster has
 */
const createResults = (
  votes: Vote[]
): Record<string, { wins: number; losses: number }> => {
  return votes.reduce<Record<string, { wins: number; losses: number }>>(
    (acc, vote) => {
      if (!(vote.winner in acc)) {
        acc[vote.winner] = { wins: 0, losses: 0 };
      }
      if (!(vote.loser in acc)) {
        acc[vote.loser] = { wins: 0, losses: 0 };
      }

      acc[vote.winner].wins++;
      acc[vote.loser].losses++;
      return acc;
    },
    {}
  );
};

export const getAllVotes = async () => {
  // TODO: regularly performing SELECT * will not be performant as the DB
  // scales. Refactoring the data model to store a vote tally for each poster,
  // rather than a single row for each vote would probably be the most effective
  // solution, but requires a lot of changes
  return await prisma.vote.findMany();
};

export const votingResults = (
  allVotes: Vote[],
  grade: "4" | "5" | "6" | "7",
  homeroom: keyof typeof HomeroomsTypes
) => {
  if (allVotes.length == 0) throw new Error("there are no votes");

  return {
    allVotes,
    school: createResults(allVotes.filter((vote) => vote.type == "SCHOOL")),
    grade: createResults(
      allVotes.filter(
        (vote) => vote.type == "GRADE" && parsePath(vote.winner).grade === grade
      )
    ),
    homeroom: createResults(
      allVotes.filter(
        (vote) =>
          vote.type == "HOMEROOM" &&
          parsePath(vote.winner).homeroom === homeroom
      )
    ),
  };
};

export const _exportedForTesting = {
  createResults,
};
