import { LoaderFunction, Outlet, redirect } from "remix";
import { getUser } from "~/services/getUser";
import { isDoneVoting } from "~/services/checkVoteStatus";
import { getGradeLevel, getHomeroomCode } from "~/services/student";

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");
  if (!(await isDoneVoting(user))) return redirect("/voting/notDoneVoting");

  if (!params.choice) {
    // we want the user to be navigated to /voting/results/6~6A, where the slug
    // at the end represents the grade level and homeroom whoose results they
    // want to see. If there is no choice, we will route them to the default
    // choice, which is the user's own grade level and homeroom
    const [grade, homeroom] = [
      getGradeLevel(user.studentName),
      getHomeroomCode(user.studentName),
    ];
    return redirect(`/voting/results/${grade}~${homeroom}`);
  }
  return null;
};

export default function Results() {
  return (
    <div>
      <h1 className="text-center text-3xl mb-4">Voting Results</h1>
      <Outlet />
    </div>
  );
}
