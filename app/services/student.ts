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
export const getHomeroomCode = (studentName: string): string | null => {
  const result = NAME_TO_HOMEROOM[studentName];
  if (result === undefined) return null;
  return result;
};

export const getGradeLevel = (studentName: string): string | null => {
  const code = getHomeroomCode(studentName);
  if (code === null) return null;
  const gradeLevel = code.slice(0, 1);
  return gradeLevel;
};
