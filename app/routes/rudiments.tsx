import { Outlet, MetaFunction } from "remix";

import { RudimentsHeader } from "~/components/rudimentsHeader";
import { RudimentsFooter } from "~/components/rudimentsFooter";

export const meta: MetaFunction = () => {
  return { title: "Rudiments" };
};

export default function Rudiments() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <RudimentsHeader />
      <div className="flex-grow mx-2">
        <Outlet />
      </div>
      <RudimentsFooter />
    </div>
  );
}
