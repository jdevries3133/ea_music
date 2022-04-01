/**
 * Components to decorate card details for first, second, and third place
 */

import { listThings } from "~/utils/listThings";

type PlaceInput = {
  title: string;
  members: string[];
};

const cleanupTitle = (title: string) => {
  return title.replace("Results for", "");
};

export const FirstPlace: React.FC<PlaceInput> = ({ title, members }) => (
  <>
    <h1 style={{ fontFamily: "Brush Script MT" }}>
      🙌 🎊 First Place for {cleanupTitle(title)}!! 🥳 🎉
    </h1>
    <div className="w-2/3">
      <p>
        Awesome job {listThings(members)}! I'm proud of your hard work, and your
        classmates recognized it too!
      </p>
    </div>
  </>
);

export const SecondPlace: React.FC<PlaceInput> = ({ title, members }) => (
  <>
    <h1 style={{ fontFamily: "Brush Script MT" }}>
      🙌 🎊 Second Place for {cleanupTitle(title)}!! 🥳 🎉
    </h1>
    <div className="w-2/3">
      <div className="text-sm">
        <p>What do they call a sailboat in second place?</p>
        <p className="italic">The Rudder-up!</p>
      </div>

      <p>Nice work {listThings(members)}!</p>
    </div>
  </>
);

export const ThirdPlace: React.FC<PlaceInput> = ({ title, members }) => (
  <>
    <h1 style={{ fontFamily: "Brush Script MT" }}>
      🙌 🎊 Third Place for {cleanupTitle(title)}!! 🥳 🎉
    </h1>
    <div className="w-2/3">
      <p>... and third is the one with the treasure chest!</p>
      <p>Nice work {listThings(members)}!</p>
    </div>
  </>
);
