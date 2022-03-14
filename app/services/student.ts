/**
 * Services for working with students
 */

const students: Student[] = JSON.parse(process.env.STUDENT_DATA || "");

const NAME_TO_HOMEROOM: { [key: string]: string } = {};
students.forEach(({ name, homeroom }) => {
  NAME_TO_HOMEROOM[name] = homeroom;
});

/**
 * Lookup student's homeroom code by their name
 */
export const getHomeroomCode = (studentName: string): string => {
  const result = NAME_TO_HOMEROOM[studentName];
  if (result === undefined) throw new Error("could not get homeroom code");
  return result;
};

export const getGradeLevel = (studentName: string): string => {
  const code = getHomeroomCode(studentName);
  if (code === null) throw new Error("could not look up grade level");
  const gradeLevel = code.slice(0, 1);
  return gradeLevel;
};
