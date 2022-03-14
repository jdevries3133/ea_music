import { LoaderFunction, redirect, useLoaderData } from "remix";

import { VotesRemaining } from "~/components/votesRemaining";
import { getSession } from "~/sessions";
import prisma from "~/prisma";
import { checkVoteStatus, VoteStatus } from "~/services/checkVoteStatus";

export const loader: LoaderFunction = async ({
  request,
}): Promise<VoteStatus | Response> => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) return redirect("/login");

  const user = await prisma.user.findFirst({
    where: {
      id: session.get("userId"),
    },
  });
  if (!user) return redirect("/login");

  return checkVoteStatus(user);
};

export default function Results() {
  const data = useLoaderData<VoteStatus>();
  return data.votesRemaining ? (
    <VotesRemaining status={data} />
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <div className="prose">
        <h1>Voting results</h1>
        <p>
          This page is not ready yet, but it will be soon! Thanks for your
          patience.
        </p>
      </div>
    </div>
  );
}
