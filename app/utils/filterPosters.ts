import { ListObjectsCommandOutput } from "@aws-sdk/client-s3";

export type FilteredPosters = {
  all: string[];
  gradeLevel: {
    [key: string]: string[];
  };
  homeroom: {
    [key: string]: string[];
  };
};

export default function filterPosters(
  posters: ListObjectsCommandOutput
): FilteredPosters {
  const allRaw = posters.Contents ? posters.Contents.map(({ Key }) => Key) : [];
  let all: string[] = [];
  allRaw.forEach((item) => {
    if (typeof item === "string") {
      all.push(item);
    }
  });

  const gradeLevel: {
    [key: string]: string[];
  } = {};
  const homeroom: {
    [key: string]: string[];
  } = {};

  [4, 5, 6, 7].forEach((grade) => {
    gradeLevel[grade] = [];
    ["A", "B", "C", "D", "E"].forEach((section) => {
      homeroom[grade + section] = [];
    });
  });

  all.forEach((path) => {
    const result = path.match(/posters\/(\d\w)\/(.*).png/);
    if (result) {
      const homeroomCode = result[1];
      const pathGradeLevel = parseInt(homeroomCode.slice(0, 1));
      gradeLevel[pathGradeLevel].push(path);
      homeroom[homeroomCode].push(path);
    }
  });

  return {
    all,
    homeroom,
    gradeLevel,
  };
}
