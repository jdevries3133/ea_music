/**
 * Rudiment page for a single homeroom, where they are viewed, I can check off
 * their completion, etc.
 */

import { useLoaderData, LoaderFunction } from "remix";
import { Homerooms } from "~/constants";
import { getCompletedRudiments } from "~/services/rudiments";

type LoaderData = Awaited<ReturnType<typeof getCompletedRudiments>>;

export const loader: LoaderFunction = ({ params }) => {
  if (params.homeroom === undefined || !Homerooms.has(params?.homeroom)) {
    throw new Response("homeroom does not exist", { status: 404 });
  }
  return getCompletedRudiments(params.homeroom);
};

export default function Homeroom() {
  const data = useLoaderData<LoaderData>();
  return <h1>hi</h1>;
}
