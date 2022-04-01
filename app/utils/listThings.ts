/**
 * Convert string[] to "i[0], i[1], i[2], ..., **and** i[-1]"
 */
export const listThings = (things: string[]) => {
  return `${things.slice(0, -1).join(", ")}, and ${things.at(-1)}`;
};
