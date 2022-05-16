import { Link } from "remix";

export const RudimentsHeader = () => (
  <div className="w-full flex items-center bg-gray-100 rounded-b-lg p-2">
    <h3 className="flex-grow">Rudiments</h3>
    <Link to="/">
      <button className="bg-green-100 p-1 m-1 rounded shadow">home</button>
    </Link>
  </div>
);
