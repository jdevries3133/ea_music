import { parsePath } from "./parsePath";

describe("parsePath", () => {
  it("parses name with single path", () => {
    expect(parsePath("posters/4A/Joe Smith.jpg")).toStrictEqual({
      homeroom: "4A",
      grade: "4",
      students: ["Joe Smith"],
    });
    expect(parsePath("posters/7B/Za'M Jose.jpg")).toStrictEqual({
      homeroom: "7B",
      grade: "7",
      students: ["Za'M Jose"],
    });
  });
  it("parses path with many names", () => {
    expect(parsePath("posters/7B/Za'M Jose,Tally Tilly.jpg")).toStrictEqual({
      homeroom: "7B",
      grade: "7",
      students: ["Za'M Jose", "Tally Tilly"],
    });
  });
  it("disallows invalid grade", () => {
    expect(() => parsePath("posters/8B/Za'M Jose,Tally Tilly.jpg")).toThrow();
    expect(() => parsePath("posters/1B/Za'M Jose,Tally Tilly.jpg")).toThrow();
    expect(() => parsePath("posters/2B/Za'M Jose,Tally Tilly.jpg")).toThrow();
    expect(() => parsePath("posters/9B/Za'M Jose,Tally Tilly.jpg")).toThrow();
  });
  it("disallows invalid homeroom codes", () => {
    expect(() => parsePath("posters/4Z/Za'M Jose,Tally Tilly.jpg")).toThrow();
    expect(() => parsePath("posters/4a/Za'M Jose,Tally Tilly.jpg")).toThrow();
  });
});
