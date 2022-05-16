export const S3_BUCKET_BASE_URI =
  "https://ea-posters.s3.us-east-2.amazonaws.com/";

export const Homerooms = new Set([
  "4A",
  "4B",
  "4C",
  "4D",
  "4E",
  "5A",
  "5B",
  "5C",
  "5D",
  "5E",
  "6A",
  "6B",
  "6C",
  "6D",
  "6E",
  "7A",
  "7B",
  "7C",
  "7D",
  "7E",
]);

export const Grades = new Set(["4", "5", "6", "7"]);

/**
 * All of the rudiments in the static folder are here. They can be switched
 * on and off as feature flags by commenting/uncommenting them here. I want
 * to start by restricting the amount of rudiments presented to avoid
 * overwhelming students.
 */
export const ShowRudiments: Array<{
  fileName: string;
  displayName: string;
}> = [
  {
    displayName: "Single Stroke Roll",
    fileName: "singleStrokeRoll.webp",
  },
  {
    displayName: "Single Stroke Four",
    fileName: "singleStrokeFour.webp",
  },
  // {
  //   displayName: "Single Stroke Seven",
  //   fileName: "singleStrokeSeven.webp",
  // },
  {
    displayName: 'Buzz Roll (aka "multiple bounce roll")',
    fileName: "buzzRoll.webp",
  },
  {
    displayName: "Triple Stroke Roll",
    fileName: "tripleStrokeRoll.webp",
  },
  {
    displayName: "Double Stroke Roll",
    fileName: "doubleStrokeRoll.webp",
  },
  {
    displayName: "Five Stroke Roll",
    fileName: "fiveStrokeRoll.webp",
  },
  // {
  //   displayName: "Five Stroke Roll Triple",
  //   fileName: "fiveStrokeRollTriple.webp",
  // },
  // {
  //   displayName: "Nine Stroke Roll",
  //   fileName: "nineStrokeRoll.webp",
  // },
  {
    displayName: "Paradiddle",
    fileName: "paradiddle.webp",
  },
  // {
  //   displayName: "ParadiddleDiddle",
  //   fileName: "paradiddleDiddle.webp",
  // },
  // {
  //   displayName: "Triple Paradiddle",
  //   fileName: "tripleParadiddle.webp",
  // },
  {
    displayName: "Flam",
    fileName: "flam.webp",
  },
  // {
  //   displayName: "Flam Accent",
  //   fileName: "flamAccent.webp",
  // },
  {
    displayName: "Flam Tap",
    fileName: "flamTap.webp",
  },
  // {
  //   displayName: "Flamacue",
  //   fileName: "flamacue.webp",
  // },
  {
    displayName: "Drag",
    fileName: "drag.webp",
  },
  // {
  //   displayName: "Single Drag Tap",
  //   fileName: "singleStrokeSeven.webp",
  // },
  // {
  //   displayName: "Single Drag Tap",
  //   fileName: "singleDragTap.webp",
  // },
  // {
  //   displayName: "Single Dragadiddle",
  //   fileName: "singleDragadiddle.webp",
  // },
];
