import { Link } from "remix";

export default function NoMoreThings() {
  return (
    <div className="flex min-h-screen items-center justify-center p-2 m-2 md:p-6 md:m-6">
      <div className="prose">
        <h1>Nothing More to See!</h1>
        <p>
          You have voted on all the posters there are to see! You might have
          seen all the posters in your homeroom, grade level, or maybe all the
          posters in the school!
        </p>
        <p>
          If you haven't already, try browsing a different collection of
          posters, like posters from the whole school.
        </p>
        <Link to="/votingType">See more stuff</Link>
      </div>
    </div>
  );
}
