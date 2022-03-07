import { LoaderFunction, redirect } from "remix";
import { Card } from "~/components/card";

import { getSession } from "~/sessions";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    return redirect("/login");
  }
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
        href="/vote/school/"
      />
      <Card
        text="Vote for posters within your grade level"
        imageSrc="/grade.svg"
        alt="drawing of students sitting at desks"
        href="/vote/grade/"
      />
      <Card
        text="Vote for posters within your homeroom"
        imageSrc="/homeroom.svg"
        alt="drawing of students sitting at desks"
        href="/vote/grade/"
      />
    </div>
  );
}
