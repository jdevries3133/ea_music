import { SyntheticEvent } from "react";
import buildPosterURI from "~/utils/buildPosterUri";

/**
 * Binary choice vote component
 */
export const VoteChoice: React.FC<{
  // path to option one
  a: string;
  // path to option two
  b: string;
  onChosen: (e: SyntheticEvent, choicePath: string) => void;
}> = ({ a, b, onChosen }) => {
  const getMembers = (path: string): string[] => {
    const result = path.match(/posters\/\d\w\/(.*).png/);
    if (result) {
      return result[1].split(",");
    }
    return [""];
  };

  return (
    <div className="grid grid-cols-2 gap-3 m-2">
      <button
        onClick={(e) => onChosen(e, a)}
        className="bg-gray-100 hover:bg-green-100 transition rounded-lg shadow-lg hover:shadow-none p-6"
      >
        {getMembers(a) && (
          <p className="text-sm font-light">
            Group members: {getMembers(a).join(", ")}
          </p>
        )}
        <img src={buildPosterURI(a)} alt="this group's poster" />
      </button>
      <button
        onClick={(e) => onChosen(e, b)}
        className="bg-gray-100 hover:bg-green-100 transition rounded-lg shadow-lg hover:shadow-none p-6"
      >
        {getMembers(b) && (
          <p className="text-sm font-light">
            Group members: {getMembers(b).join(", ")}
          </p>
        )}
        <img src={buildPosterURI(b)} alt="this group's poster" />
      </button>
    </div>
  );
};
