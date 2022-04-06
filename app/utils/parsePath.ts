const POSTER_PATH_PATTERN = /posters\/([4567])([ABCDE])\/(.*)\.(jpg|png)/

export const isValid = (path: string) : boolean =>  {
  return POSTER_PATH_PATTERN.test(path)
}

/**
 * Paths to posters inside the S3 bucket stores a lot of information about
 * posters, which makes it possible to keep information about students out of
 * source control. These utilities parse information out of poster names,
 * with the understanding that poster use the following naming convention:
 *
 * posters/<grade_level><homeroom_code>/<student1>,<student2><...>.jpg
 */

export const parsePath = (
  path: string
): {
  grade: "4" | "5" | "6" | "7";
  homeroom: keyof typeof HomeroomsTypes;
  students: string[];
} => {
  const exp = path.match(POSTER_PATH_PATTERN );
  if (!exp) {
    throw new Error(`path is invalid: ${path}`);
  }

  const [_, gradeLevel, homeroomCode, commaDelimitedNames] = exp;
  const students = commaDelimitedNames.split(",");

  // validation
  const grade = gradeLevel as "4" | "5" | "6" | "7";

  // we know that `grade` is in 4, 5, 6, 7 from validation above
  // we know that `homeroomCode` is in A, B, C, D, E because the regex enforces it
  const homeroom = (grade + homeroomCode) as keyof typeof HomeroomsTypes;

  return { grade, homeroom, students };
};
