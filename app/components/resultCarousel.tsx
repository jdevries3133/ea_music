import { parsePath } from "~/utils/parsePath";
import buildPosterUri from "~/utils/buildPosterUri";
import { PosterCard } from "./posterCard";

export const ResultCarousel: React.FC<{
  title: string;
  results: Record<
    string,
    {
      wins: number;
      losses: number;
    }
  >;
}> = ({ title, results }) => {
  // transform to a sorted and parsed representation for presentation
  const sortedResults = Object.keys(results)
    .sort((a, b) => results[b].wins - results[a].wins)
    .map((key) => ({
      ...parsePath(key),
      ...results[key],
      uri: buildPosterUri(key),
    }));
  return (
    <>
      <h1 className="text-center mb-2 mt-4">{title}</h1>
      <div className="m-1 p-1 sm:m-4 sm:p-4 bg-indigo-200 shadow-indigo-md rounded-xl snap-x sm:snap-none overflow-x-scroll overflow-y-hidden whitespace-nowrap">
        {sortedResults.length ? (
          sortedResults.map(({ wins, losses, uri, students }, i) => (
            <PosterCard
              title={title}
              uri={uri}
              students={students}
              place={i + 1}
              wins={wins}
              losses={losses}
            />
          ))
        ) : (
          <p>No posters for {title}</p>
        )}
      </div>
    </>
  );
};
