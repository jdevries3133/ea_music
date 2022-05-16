import invariant from "tiny-invariant";
import { Homerooms, ShowRudiments } from "~/constants";
import prisma from "~/prisma";

// affects percentComplete calculations
const TOTAL_RUDIMENTS = ShowRudiments.length;

/**
 * Percentage of unlocked rudiments for each homeroom. Ensures that a
 * "0" result is returned for each homeroom, even if there are not any
 * rows for that homeroom in the database yet.
 *
 * Percentage is derived from the `TOTAL_RUDIMENTS` private constant in this
 * module.
 */
type HomeroomCount = { homeroom: string; percent: number };
export async function percentCompletedRudimentsAll(): Promise<HomeroomCount[]> {
  const dbResult = (
    await prisma.rudimentUnlocked.groupBy({
      by: ["homeroom"],
      _count: {
        _all: true,
      },
    })
  ).map(({ homeroom, _count }) => ({
    homeroom,
    percent: _count._all / TOTAL_RUDIMENTS,
  }));

  const homeroomNameMapping: {
    [key: string]: HomeroomCount;
  } = {};
  dbResult.forEach((result) => {
    homeroomNameMapping[result.homeroom] = result;
  });

  return Array.from(Homerooms).map((homeroom) => {
    if (homeroom in homeroomNameMapping) {
      return homeroomNameMapping[homeroom];
    }
    return { homeroom, percent: 0 };
  });
}

/**
 * Validate that `homeroom` is in constants.Homerooms, and then perform the
 * prisma query to get all rudiment unlocks for that homeroom.
 */
export function getCompletedRudiments(homeroom: string) {
  invariant(Homerooms.has(homeroom));

  return prisma.rudimentUnlocked.findMany({
    where: { homeroom },
  });
}

/**
 * Safe method to unlock rudiments, which checks if the rudiment has already
 * been unlocked. rudimentId must be unique according to the schema, so a
 * rudiment can only be unlocked one time.
 */
export async function unlockRudiment(homeroom: string, rudimentId: number) {
  const isUnlocked = !!(await prisma.rudimentUnlocked.count({
    where: { homeroom, rudimentId },
  }));
  if (isUnlocked) return;

  return prisma.rudimentUnlocked.create({
    data: {
      homeroom,
      rudimentId,
    },
  });
}
