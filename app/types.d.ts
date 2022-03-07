declare enum Homerooms {
  "4A",
  "4B",
  "4C",
  "4D",
  "4E",
  "5A",
  "5B",
  "5C",
  "5D",
  "5E",
  "6A",
  "6B",
  "6C",
  "6D",
  "6E",
  "7A",
  "7B",
  "7C",
  "7D",
  "7E",
}

type Student = {
  name: string;
  homeroom: keyof typeof Homerooms;
};
