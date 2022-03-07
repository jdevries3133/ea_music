import Fuse from "fuse.js";

const students: Student[] = JSON.parse(process.env.STUDENT_DATA || "");
const studentNames = students.map(({ name }) => name);
const fuse = new Fuse(studentNames, {
  includeScore: true,
});

/**
 * Given a student name, match them with a sanitized student name. Returns
 * `true` if the name is an exact match, or a list of at most 10 close matches
 * if not.
 */
export default function findStudent(rawName: string) {
  const result = fuse.search(rawName);
  if (result.length === 0) {
    return [];
  }
  if (result[0].item === rawName) {
    return true;
  }
  return result
    .filter(({ score }) => score && score < 0.6)
    .map(({ item }) => item)
    .slice(0, 10);
}
