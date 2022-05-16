import { LoaderFunction, useLoaderData } from "remix";
import {
  ThermometerButton,
  ThermometerButtonKey,
} from "~/components/thermometerButton";
import { percentCompletedRudimentsAll } from "~/services/rudiments";

export type LoaderData = Awaited<
  ReturnType<typeof percentCompletedRudimentsAll>
>;

export const loader: LoaderFunction = () => {
  return percentCompletedRudimentsAll();
};

export default function Rudiments() {
  const data = useLoaderData<LoaderData>();
  return (
    <div className="max-w-lg">
      <ThermometerButtonKey />
      <div className="w-full grid grid-cols-5 text-center">
        {data.map(({ homeroom, percent }) => (
          <ThermometerButton key={homeroom} percent={percent}>
            <p className="font-medium">{homeroom}</p>
          </ThermometerButton>
        ))}
      </div>
    </div>
  );
}
