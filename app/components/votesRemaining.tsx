/**
 * When the user tries to see results but still has to vote, this component
 * redirects them back towards voting
 */

import { Link } from "remix";
import { VoteStatus } from "~/services/checkVoteStatus";

const word = (n: number) => (n >= 2 ? "times" : "time");

export const VotesRemaining: React.FC<{ status: VoteStatus }> = ({
  status,
}) => {
  const cntSchool = status.categories.school.length - 1;
  const cntGr = status.categories.grade.length - 1;
  const cntHr = status.categories.homeroom.length - 1;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="prose">
        <h1>You still have more voting to do!</h1>
        {cntSchool > 0 && (
          <p>
            You need to vote {cntSchool} more {word(cntSchool)} in at the school
            level.{" "}
            <Link to="/voting/castVote/school">Click here to do that now</Link>
          </p>
        )}
        {cntGr > 0 && (
          <p>
            You need to vote {cntGr} more {word(cntGr)} within your grade level.{" "}
            <Link to="/voting/castVote/grade">Click here to do that now</Link>
          </p>
        )}
        {cntHr > 0 && (
          <p>
            You need to vote {cntHr} more {word(cntHr)} within your homeroom.{" "}
            <Link to="/voting/castVote/homeroom">
              Click here to do that now
            </Link>
          </p>
        )}
        <p className="text-sm italic font-light">
          The results page is ready, and it's really cool, but you can't see it
          until you finish voting!!
        </p>
      </div>
    </div>
  );
};
