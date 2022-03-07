import { SyntheticEvent, useState } from "react";
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { VoteChoice } from "~/components/voteChoice";
import listPosters from "~/services/listPosters";
import { getGradeLevel } from "~/services/student";
import { getSession } from "~/sessions";
import filterPosters from "~/utils/filterPosters";
import { randomSelect } from "~/services/randomSelect";
import { countVote } from "~/services/countVote";
import prisma from "~/prisma";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    return redirect("/login");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.get("userId"),
    },
  });
  if (!user) {
    return { error: "user could not be created" };
  }
  const gradeLevel = getGradeLevel(user.studentName);
  if (gradeLevel === null) {
    return {
      error: `could not lookup grade level for ${user.studentName}`,
    };
  }

  const form = await request.formData();
  const winner = form.get("posterChoice");
  const loser = form.get("loser");

  // to validate the choice, we will ensure that it is included in all the
  // possible choices
  const all = await listPosters();
  const posters = filterPosters(all);
  const gradePosters = posters.gradeLevel[gradeLevel];
  if (
    winner &&
    gradePosters.includes(winner as string) &&
    loser &&
    gradePosters.includes(loser as string)
  ) {
    countVote(
      {
        voteType: "GRADE",
        loser: loser as string,
        winner: winner as string,
      },
      user
    );
    return {
      voteCounted: true,
    };
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    return redirect("/login");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.get("userId"),
    },
  });
  if (!user) {
    return { error: "user could not be created" };
  }
  const gradeLevel = getGradeLevel(user.studentName);
  if (gradeLevel === null) {
    return {
      error: `could not lookup grade level for ${user.studentName}`,
    };
  }

  const all = await listPosters();
  const posters = filterPosters(all);
  const gradePosters = posters.gradeLevel[gradeLevel];

  const result = await randomSelect(gradePosters, user, "GRADE");
  if (result) {
    const { posterA, posterB } = result;
    return {
      gradeLevel,
      posterA,
      posterB,
    };
  }
  return {};
};
export default function Grade() {
  const [choice, setChoice] = useState("");
  const { gradeLevel, posterA, posterB, error } = useLoaderData();

  if (posterA === undefined) {
    return redirect("/noMoreThings");
  }

  if (error) {
    return (
      <>
        <p>Something went wrong</p>
        <p>
          Error message: <span className="font-light">{error}</span>
        </p>
      </>
    );
  }

  const onPosterChosen = (_: SyntheticEvent, chosenPath: string) => {
    setChoice(chosenPath);
  };

  return (
    <>
      <Link to="/votingType">
        <button className="fixed top-2 right-2 bg-gray-100 p-2 rounded">
          Go Back
        </button>
      </Link>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1>Vote for a Poster</h1>
        <h2>Voting for posters in the {gradeLevel}th grade.</h2>
        <p>Click on your favorite poster!</p>
        <Form method="post">
          <input name="posterChoice" type="hidden" value={choice} />
          <input
            name="loser"
            type="hidden"
            value={posterA === choice ? posterB : posterA}
          />
          <VoteChoice a={posterA} b={posterB} onChosen={onPosterChosen} />
        </Form>
      </div>
    </>
  );
}
