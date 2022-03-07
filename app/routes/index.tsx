import { LoaderFunction } from "remix";

export const loader: LoaderFunction = () => {
  console.log(process.env.STUDENT_DATA);
  return "hi";
};

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>Poster Vote!</h1>
      <a className="link" href="/votingType">
        <p>Go vote for a poster</p>
      </a>
    </div>
  );
}
