// TODO: it would be more politically correct to put these components in
// modules in a separate file but oh well; flat is better than nested, I say

// this is coupled to everything in here, but everything updates nicely if
// you add or remove gradients
const successShades = [
  "bg-white",
  "bg-green-100",
  "bg-green-200",
  "bg-green-300",
  "bg-green-400",
  "bg-yellow-300",
];

/**
 * Thermometer button with progressive shades of green.
 */
export const ThermometerButton: React.FC<{
  percent: number;
}> = ({ percent, children }) => {
  const shade = successShades[Math.floor(percent * successShades.length)];
  return (
    <button className={`${shade} p-1 m-1 text-lg border shadow rounded`}>
      {children}
    </button>
  );
};

/**
 * Key that explains the color coding. Question mark icon expands into the full
 * container when toggled.
 */
export const ThermometerButtonKey = () => {
  return (
    <div className="p-1 m-1 text-center bg-purple-100 border shadow rounded">
      <div className="prose text-gray-800">
        <h2>Key</h2>
        <p>
          Shades of green show what percent of all rudiments each class has
          learned.
        </p>
        <div className="grid grid-cols-3">
          {successShades.map((shade, i) => (
            <SuccessShadeTile key={i} shade={shade} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * One single card which is factored out of the key, used to display the
 * percentage and color of the example.
 */
const SuccessShadeTile: React.FC<{ shade: string; index: number }> = ({
  shade,
  index,
}) => {
  const shadePercent = Math.floor((100 * (index + 1)) / successShades.length);
  return (
    <p
      className={`${
        index == 0 ? "border" : ""
      } ${shade} text-sm rounded m-2 p-2 shadow`}
    >
      {index === 0 ? `0 – ${shadePercent}` : shadePercent}%
    </p>
  );
};
