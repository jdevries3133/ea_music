import { User } from "@prisma/client";

import { getSession } from "~/sessions";
import prisma from "~/prisma";

export const getUser = async (request: Request): Promise<User | null> => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) return null;

  return await prisma.user.findUnique({
    where: {
      id: session.get("userId"),
    },
  });
};
