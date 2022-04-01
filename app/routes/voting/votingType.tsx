import { LoaderFunction, redirect } from "remix";
import { Card } from "~/components/card";

import { getUser } from "~/services/getUser";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");
  return null;
};

export default function VotingType() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>Choose Voting Type</h1>

      <Card
        text="Vote for posters across the school"
        imageSrc="/school.svg"
        alt="drawing of school building"
        href="/voting/castVote/school/"
      />
      <Card
        text="Vote for posters within your grade level"
        imageSrc="/grade.svg"
        alt="drawing of students sitting at desks"
        href="/voting/castVote/grade/"
      />
      <Card
        text="Vote for posters within your homeroom"
        imageSrc="/homeroom.svg"
        alt="drawing of students sitting at desks"
        href="/voting/castVote/homeroom/"
      />

      <h3 className="font-serif text-xl">Or</h3>
      <Card
        text="See results!"
        imageSrc="/results.svg"
        alt="picture or person and a ballot box"
        href="/voting/results"
      />
    </div>
  );
}
