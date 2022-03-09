import { Link } from "remix";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>Poster Vote!</h1>
      <Link className="link" to="/voting/votingType">
        <p>Go vote for some posters</p>
      </Link>
    </div>
  );
}
