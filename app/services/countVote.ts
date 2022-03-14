import { User } from "@prisma/client";

import prisma from "~/prisma";

type VoteData = {
  voteType: "SCHOOL" | "GRADE" | "HOMEROOM";
  winner: string;
  loser: string;
};

/**
 * Count a poster vote
 */
export const countVote = async (vote: VoteData, user: User) => {
  return await prisma.vote.create({
    data: {
      loser: vote.loser,
      winner: vote.winner,
      type: vote.voteType,
      Voter: {
        connect: {
          id: user.id,
        },
      },
    },
  });
};
