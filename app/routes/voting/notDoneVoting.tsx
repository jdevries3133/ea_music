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
  return <VotesRemaining status={data} />;
}
