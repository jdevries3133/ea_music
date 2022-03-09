import { User, VoteType } from "@prisma/client";
import prisma from "~/prisma";

/**
 * Given an array of posters, randomly select two posters for voting. Will not
 * return a poster that the user has voted for before.
 *
 * May return `null` if the user has no more posters to view within this group
 * of posterPaths
 */
export const randomSelect = async (
  posterPaths: string[],
  user: User,
  voteType: VoteType
): Promise<{ posterA: string; posterB: string } | null> => {
  // filter out posters that the user has chosen as winners. Losing posters
  // may be shown again against a different competitor
  const seen = await prisma.vote.findMany({
    where: {
      Voter: {
        id: user.id,
      },
      type: voteType,
    },
  });
  const seenWinners = seen.map((i) => i.winner);
  const posterChoices = posterPaths.filter((p) => !seenWinners.includes(p));

  if (posterChoices.length < 2) {
    return null;
  }

  let a = Math.floor(Math.random() * posterChoices.length);
  let b = Math.floor(Math.random() * posterChoices.length);

  // ensure that a and b are never the same
  while (a === b) {
    b = Math.floor(Math.random() * posterChoices.length);
  }

  return {
    posterA: posterPaths[a],
    posterB: posterPaths[b],
  };
};
