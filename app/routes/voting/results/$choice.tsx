import {
  redirect,
  ActionFunction,
  LoaderFunction,
  useLoaderData,
  useActionData,
  Form,
} from "remix";
import invariant from "tiny-invariant";
import listPosters from "~/services/listPosters";
import filterPosters from "~/utils/filterPosters";
import { ResultCarousel } from "~/components/resultCarousel";
import { getUser } from "~/services/getUser";
import { getAllVotes, votingResults } from "~/services/votingResults";
import { Grades, Homerooms } from "~/constants";
import { GradeAndHomeroomFields } from "~/components/gradeAndHomeroomForm";

export type SchoolOpts = {
  grade: "4" | "5" | "6" | "7";
  homeroom: keyof typeof HomeroomsTypes;
};

type LoaderData = SchoolOpts & {
  results: UnwrapPromise<ReturnType<typeof votingResults>>;
  posters: UnwrapPromise<ReturnType<typeof filterPosters>>;
};

const validateSchoolOpts = (grade: any, homeroom: any): SchoolOpts => {
  invariant(typeof homeroom === "string", "homeroom must be a string");
  invariant(typeof grade === "string", "grade must be a string");

  invariant(Homerooms.has(homeroom), `homeroom ${homeroom} is invalid`);
  invariant(Grades.has(grade), `grade ${grade} is invalid`);

  return {
    homeroom: homeroom as keyof typeof HomeroomsTypes,
    grade: grade as "4" | "5" | "6" | "7",
  };
};

/**
 * the url param `choice` stores two pieces of information: the grade level
 * choice and the homeroom choice. These options are stored in that order,
 * delimited by a ~
 */
const validateChoicesParam = (choiceParam: string | undefined): SchoolOpts => {
  invariant(choiceParam !== undefined, "missing param");

  const choices = choiceParam.split("~");
  invariant(choices.length == 2, "invalid param");
  const [grade, homeroom] = choices;

  return validateSchoolOpts(grade, homeroom);
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const unvalidatedHomeroom = form.get("homeroom");
  const unvalidatedGrade = form.get("grade");

  const { grade, homeroom } = validateSchoolOpts(
    unvalidatedGrade,
    unvalidatedHomeroom
  );

  return redirect(`/voting/results/${grade}~${homeroom}`);
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData | Response> => {
  const user = await getUser(request);
  if (!user) return redirect("/login");

  const { grade, homeroom } = validateChoicesParam(params.choice);

  const results = votingResults(await getAllVotes(), grade, homeroom);
  const posters = filterPosters(await listPosters());

  return {
    results,
    posters,
    grade,
    homeroom: homeroom as keyof typeof HomeroomsTypes,
  };
};

export default function VoteResults() {
  let { results, grade, homeroom }: LoaderData = useLoaderData();

  return (
    <div>
      <div className="w-full flex items-center justify-center">
        <div className="inline-block p-4 bg-blue-100 rounded-lg">
          <Form
            className="flex flex-col sm:flex-row gap-2 md:gap-8"
            method="post"
          >
            <GradeAndHomeroomFields data={{ grade, homeroom }} />
          </Form>
        </div>
      </div>
      <ResultCarousel
        title={`Results for Homeroom ${homeroom}`}
        results={results.homeroom}
      />
      <ResultCarousel
        title={`${grade}th Grade Results`}
        results={results.grade}
      />
      <ResultCarousel title="School-Wide Results" results={results.school} />
    </div>
  );
}
