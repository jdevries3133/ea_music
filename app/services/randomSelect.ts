import { User } from "@prisma/client";

/**
 * Given an array of posters, randomly select two posters for voting. Will not
 * return a poster that the user has voted on before.
 *
 * May return `null` if the user has no more posters to view within this group
 * of posterPaths
 */
export const randomSelect = (
  posterPaths: string[],
  user: User
): { posterA: string; posterB: string } | null => {
  let a = Math.floor(Math.random() * posterPaths.length);
  let b = Math.floor(Math.random() * posterPaths.length);

  // ensure that a and b are never the same
  while (a === b) {
    b = Math.floor(Math.random() * posterPaths.length);
  }

  return {
    posterA: posterPaths[a],
    posterB: posterPaths[b],
  };
};
