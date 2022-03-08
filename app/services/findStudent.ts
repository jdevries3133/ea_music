import Fuse from "fuse.js";

const students: Student[] = JSON.parse(process.env.STUDENT_DATA || "");
const studentNames = students.map(({ name }) => name);
const fuse = new Fuse(studentNames, {
  includeScore: true,
});

type FindStudentResult = {
  isMatch: boolean;
  closeMatches: string[];
  matchingName: string;
};

/**
 * Given a student name, match them with a sanitized student name.
 */
export default function findStudent(rawName: string): FindStudentResult {
  const result = fuse.search(rawName);
  if (result.length === 0) {
    return {
      isMatch: false,
      matchingName: "",
      closeMatches: [],
    };
  }
  return {
    isMatch: result[0].item.toLowerCase() === rawName.toLowerCase(),
    matchingName: result[0].item,
    closeMatches: result
      .filter(({ score }) => score && score < 0.6)
      .map(({ item }) => item)
      .slice(0, 10),
  };
}
