import {
  Link,
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useTransition,
} from "remix";

import { getUser } from "~/services/getUser";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");

  return user.studentName;
};

export default function Voting() {
  const { state } = useTransition();
  const name = useLoaderData();
  return state === "loading" ? (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Loading...</h1>
    </div>
  ) : (
    <>
      <div className="m-3">
        <span className="font-bold">Name: </span>
        <span className="font-light">{name}</span>
        <Link to="/logout">
          <button className="ml-2 bg-red-100 p-1 rounded shadow">
            Log Out
          </button>
        </Link>
      </div>
      <Outlet />
    </>
  );
}
