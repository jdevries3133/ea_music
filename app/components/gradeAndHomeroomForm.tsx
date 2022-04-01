import { SchoolOpts } from "~/routes/voting/results/$choice";

export const GradeAndHomeroomFields: React.FC<{ data: SchoolOpts }> = ({
  data,
}) => {
  const { grade, homeroom } = data;
  return (
    <>
      <label className="text-center">
        <p>Grade Level</p>
        <select name="grade" defaultValue={grade}>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
        </select>
      </label>
      <label className="text-center">
        <p>Homeroom</p>
        <select name="homeroom" defaultValue={homeroom}>
          <option>4A</option>
          <option>4B</option>
          <option>4C</option>
          <option>4D</option>
          <option>4E</option>
          <option>5A</option>
          <option>5B</option>
          <option>5C</option>
          <option>5D</option>
          <option>5E</option>
          <option>6A</option>
          <option>6B</option>
          <option>6C</option>
          <option>6D</option>
          <option>6E</option>
          <option>7A</option>
          <option>7B</option>
          <option>7C</option>
          <option>7D</option>
          <option>7E</option>
        </select>
      </label>
      <button className="p-2 m-2 rounded text-white bg-purple-500 shadow">
        Submit
      </button>
    </>
  );
};
