import { useState } from "react";
import { FirstPlace, SecondPlace, ThirdPlace } from "./place";

export const PosterCard: React.FC<{
  uri: string;
  title: string;
  students: string[];
  place: number;
  wins?: number;
  losses?: number;
}> = ({ title, students, uri, place, wins, losses }) => {
  const [showDetails, _setter] = useState(false);
  const toggleShowDetails = () => _setter(!showDetails);

  const placeColors: Record<number, Record<"border" | "overlay", string>> = {
    1: {
      border: "border-yellow-200",
      overlay: "bg-yellow-100",
    },
    2: {
      border: "border-gray-200",
      overlay: "bg-gray-100",
    },
    3: {
      border: "border-amber-500",
      overlay: "bg-amber-300",
    },
  };
  return (
    <a
      className="group inline-block relative mx-4 min-w-md cursor-pointer"
      onClick={toggleShowDetails}
    >
      {showDetails && (
        <div
          className={`absolute z-20 w-full h-full opacity-95 rounded
          gap-2 whitespace-normal items-center justify-center
          sm:group-hover:scale-105 sm:roup-hover:opacity-95 transition
          ${placeColors[place]?.overlay || "bg-white"}
          `}
        >
          <div className="w-full h-full">
            <div className="flex flex-col h-full items-center justify-center">
              {place === 1 ? (
                <FirstPlace title={title} members={students} />
              ) : place === 2 ? (
                <SecondPlace title={title} members={students} />
              ) : place === 3 ? (
                <ThirdPlace title={title} members={students} />
              ) : (
                <>
                  {/* we can always use "th" suffix because 1st, 2nd, and 3rd are */}
                  {/* handled above */}
                  <h1>{place}th Place!</h1>
                  <h2>
                    {students.length > 1 ? "Group Members" : "Poster Creator"}
                  </h2>
                  <p>{students.join(", ")}</p>
                </>
              )}
              {wins && (
                <div className="md:mt-4">
                  <h3>Wins: {wins}</h3>
                  {losses && <p>Losses: {losses}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <img
        className={`h-full sm:h-[80vh]  jounded border-8 ${
          placeColors[place]?.border || "bg-white"
        } shadow-2xl shadow-yellow-200/50 snap-center
        sm:group-hover:shadow-none sm:group-hover:scale-105 transition relative z-0`}
        key={uri}
        src={uri}
        loading="lazy"
      />
    </a>
  );
};
