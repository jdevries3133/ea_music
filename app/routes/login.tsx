import { useState } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import findStudent from "~/services/findStudent";
import { commitSession, getSession } from "~/sessions";
import prisma from "~/prisma";

type ActionData = {
  name: string;
  match: boolean;
  names: string[];
};

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    return redirect("/votingType");
  }
  const form = await request.formData();
  const name = form.get("name");

  if (name) {
    // validate the name amongst the list of student names. If the name is valid,
    // check if a user exists with that name. If not, create one. Then, set the
    // session ID and redirect
    const result = findStudent(name as string);
    if (result.isMatch === true) {
      let user = await prisma.user.findFirst({
        where: {
          studentName: result.matchingName,
        },
      });
      if (user) {
        session.set("userId", user.id);
      } else {
        let user = await prisma.user.create({
          data: {
            studentName: result.matchingName,
          },
        });
        session.set("userId", user.id);
      }
      return redirect("/votingType", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    } else {
      return {
        name: name as string,
        match: false,
        names: result.closeMatches,
      };
    }
  }

  return { name: name as string, match: false, names: [] };
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("userId")) {
    return redirect("/votingType");
  }
  return null;
};

export default function Login() {
  const { state } = useTransition();
  const data = useActionData<ActionData>();
  const [name, setName] = useState(data?.name || "");
  let names: string[] = [];
  if (data) {
    names = data.names;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {state === "loading" ? (
        <h1>Loading</h1>
      ) : state === "submitting" ? (
        <h1>Submitting</h1>
      ) : (
        <Form method="post">
          <label>
            Your Name:{" "}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              type="text"
            />
          </label>
          <button className="bg-blue-300 rounded shadow p-2 my-2" type="submit">
            Submit
          </button>
          {names.length !== 0 && (
            <>
              <p className="font-bold">That's not an EA student name!</p>
              <p>Is one of these your name?</p>
              {names.map((name) => (
                <button
                  onClick={() => {
                    setName(name);
                  }}
                  className="block bg-yellow-100 rounded shadow p-2 m-2"
                  key={name + Math.random()}
                >
                  {name}
                </button>
              ))}
            </>
          )}
        </Form>
      )}
    </div>
  );
}
