import { LoaderFunction, redirect, useLoaderData } from "remix";

import { VotesRemaining } from "~/components/votesRemaining";
import { checkVoteStatus, VoteStatus } from "~/services/checkVoteStatus";
import { getUser } from "~/services/getUser";

export const loader: LoaderFunction = async ({
  request,
}): Promise<VoteStatus | Response> => {
  const user = await getUser(request);
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
