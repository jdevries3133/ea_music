import { Vote, VoteType } from "@prisma/client";
import {
  getAllVotes,
  votingResults,
  _exportedForTesting,
} from "./votingResults";

const { createResults } = _exportedForTesting;

test("createResults function", () => {
  // this function is what internally transforms and sorts Vote[] into
  // Array<{voteCount: number; poster: string}>
  expect(
    // prettier-ignore
    createResults([
      { id: 1, voterId: 1, winner: "baz", loser: "anything", timestamp: new Date(), type: "GRADE", },
      { id: 1, voterId: 1, winner: "baz", loser: "anything", timestamp: new Date(), type: "GRADE", },
      { id: 1, voterId: 1, winner: "foo", loser: "anything", timestamp: new Date(), type: "GRADE", },
      { id: 1, voterId: 1, winner: "bar", loser: "anything", timestamp: new Date(), type: "GRADE", },
      { id: 1, voterId: 1, winner: "baz", loser: "anything", timestamp: new Date(), type: "GRADE", },
      { id: 1, voterId: 1, winner: "foo", loser: "anything", timestamp: new Date(), type: "GRADE", },
    ])
  ).toStrictEqual({
    anything: {
      losses: 6,
      wins: 0,
    },
    bar: {
      losses: 0,
      wins: 1,
    },
    baz: {
      losses: 0,
      wins: 3,
    },
    foo: {
      losses: 0,
      wins: 2,
    },
  });
});

test("getAllVotes", async () => {
  const mockVotes = getMockVotes();
  prismaMock.vote.findMany.mockResolvedValue(mockVotes);
  expect(await getAllVotes()).toStrictEqual(mockVotes);
});

describe("votingResults service", () => {
  it("returns allVotes for outside manipulation", () => {
    const mockVotes = getMockVotes();
    const { allVotes } = votingResults(mockVotes, "4", "4A");
    expect(allVotes).toStrictEqual(mockVotes);
  });
  it("throws an error if votes array is empty", () => {
    expect(() => votingResults([], "4", "4A")).toThrow("there are no votes");
  });
  it("map poster name to number of votes (school level)", () => {
    const mockVotes = getMockVotes();
    const { school } = votingResults(mockVotes, "4", "4A");
    expect(
      school["posters/4A/Micah Williamson,Franco May,Triston Mayo.jpg"]
    ).toEqual({ losses: 0, wins: 102 });
  });
  it("map poster name to number of votes (grade level)", () => {
    const mockVotes = getMockVotes();
    const { grade } = votingResults(mockVotes, "6", "6E");
    expect(
      grade["posters/6E/Danica Hampton,Lilly Ashley,Carina Rasmussen.jpg"]
    ).toEqual({ losses: 0, wins: 50 });
  });
  it("map poster name to number of votes (homeroom level)", () => {
    const mockVotes = getMockVotes();
    const { homeroom } = votingResults(mockVotes, "4", "6E");
    expect(
      homeroom["posters/6E/Danica Hampton,Lilly Ashley,Carina Rasmussen.jpg"]
    ).toEqual({ losses: 0, wins: 13 });
  });
});

/**
 * Generates a batch of Vote objects from the mockVotesMeta collection below.
 * This recipe makes it possible to mutate mockVotesMeta, then call this
 * function again and get a different result.
 */
function getMockVotes(): Vote[] {
  const mockVotes: Vote[] = [];
  const voteTypes = Object.values(VoteType);
  mockVotesMeta.forEach((metaVote) => {
    voteTypes.forEach((voteType) => {
      let numVotes: number;
      if (typeof metaVote === "string" || metaVote[voteType] === undefined) {
        numVotes = Math.floor(Math.random() * 100);
      } else {
        let tmp = metaVote[voteType];
        if (tmp === undefined) {
          tmp = Math.floor(Math.random() * 100);
        }
        numVotes = tmp;
      }
      for (let i = 0; i < numVotes; i++) {
        mockVotes.push({
          id: 1,
          voterId: 1,
          winner: typeof metaVote === "string" ? metaVote : metaVote.posterName,
          loser: "any",
          type: voteType,
          timestamp: new Date(),
        });
      }
    });
  });
  return mockVotes;
}

/**
 * This structure gets transformed into Vote[] below, but it more clearly
 * expresses the content of the set of votes we are counting throughout
 * these unit tests. Where the value is just a string, a random number of votes
 * within the range 0-100 will be generated for each vote type.
 */
const mockVotesMeta: Array<
  | string
  | {
      posterName: string;
      HOMEROOM?: number;
      SCHOOL?: number;
      GRADE?: number;
    }
> = [
  // there is also a 4-way tie across the school for this default data set
  // the first two entries create a tie in homeroom 4C
  {
    posterName: "posters/4C/Clare Miles,Hassan Hayes,Roger Rush.jpg",
    HOMEROOM: 101,
  },
  {
    posterName: "posters/4C/Luca Bowen,Yandel Herrera,Alondra Oliver.jpg",
    HOMEROOM: 101,
  },
  // these two entries create a tie in the fifth grade
  {
    posterName: "posters/5D/Miguel Daugherty,Jayden Wolfe,Jaydin Jensen.jpg",
    GRADE: 101,
  },
  {
    posterName: "posters/5E/Kayla Morrison,Amari Navarro,Katrina Beasley.jpg",
    GRADE: 101,
  },

  // this is the school-wide winner
  {
    posterName: "posters/4A/Micah Williamson,Franco May,Triston Mayo.jpg",
    SCHOOL: 102,
  },

  {
    posterName: "posters/6E/Danica Hampton,Lilly Ashley,Carina Rasmussen.jpg",
    GRADE: 50,
    HOMEROOM: 13,
  },
  "posters/5E/Roman Cross,Jace Gonzales,Deborah Morrow.jpg",
  "posters/5A/Giana Sherman,Bridger Chase,Konnor Mccoy.jpg",
  "posters/5C/Cason Walters,Cullen Yoder,Janet Santiago.jpg",
  "posters/4D/Hugo Barry,Dereon Thompson,Roman Medina.jpg",
  "posters/6C/Olivia Vance,Hunter Meadows,Jakayla Hebert.jpg",
  "posters/7E/Ricardo Farrell,Sidney Johns,Charlize Delacruz.jpg",
  "posters/7B/Carlee Perkins,Finley Gutierrez,Micah Simpson.jpg",
  "posters/6C/Colin Davidson,Devon Hammond,Ada Wu.jpg",
  "posters/7D/Quinn Morrison,Holden Fox,Mylee Deleon.jpg",
  "posters/4D/Belinda Hart,Jaslyn Murphy,Lillie Johnston.jpg",
  "posters/5C/Valeria Ferguson,Marc Melendez,Jaylin Mann.jpg",
  "posters/5D/Landen Daugherty,Rafael Crawford,Willow Medina.jpg",
  "posters/7E/Marlon Contreras,Santino Spencer,Teresa Daniel.jpg",
  "posters/6D/Brent Cannon,Ashlynn Macdonald,Shelby Benitez.jpg",
  "posters/4B/Elsa Bradford,Darian Wilcox,Haven Barber.jpg",
  "posters/5A/Kennedy Carson,Alyvia Myers,Rebekah Sloan.jpg",
  "posters/6D/Trevin Duran,Phillip Dillon,Alexzander York.jpg",
  "posters/4A/Paisley Keller,Zara Bruce,Mya Macias.jpg",
  "posters/5B/Casey Small,Kailee Duncan,Henry Ellis.jpg",
  "posters/7C/Franklin Nichols,Braylen Reynolds,Kobe Hutchinson.jpg",
  "posters/4D/Devan Alexander,Annie Owens,Zaria Wells.jpg",
  "posters/6D/Tucker Blanchard,Bianca Sandoval,Konner Mcfarland.jpg",
  "posters/5E/Kendall Gill,Mckenzie Riggs,Karlee Mcknight.jpg",
  "posters/5B/Anabelle Prince,Eve Charles,Anabel Meyer.jpg",
  "posters/6B/Hazel Davies,Lea Bass,Angelina Cooper.jpg",
  "posters/7D/Ryann Cohen,Cruz Pittman,Thaddeus Mills.jpg",
  "posters/7A/Angelo Simon,Amirah Moon,Corey Lopez.jpg",
  "posters/6E/Zaiden Ray,Reuben Good,Darwin Wagner.jpg",
  "posters/4B/Hayden Fitzgerald,Talan Rice,Brodie Cochran.jpg",
  "posters/6C/Franco Hale,Paulina Harvey,Greta Nunez.jpg",
  "posters/4E/Destinee Manning,Mckinley Brennan,Damon Kim.jpg",
  "posters/4A/Jabari Oconnell,Elisabeth Gordon,Amy Cabrera.jpg",
  "posters/4A/Makayla Merritt,Jayden Palmer,Erick Beard.jpg",
  "posters/6C/Donald Jefferson,Anthony Wright,Marvin Rich.jpg",
  "posters/6C/Desirae Hardin,Avah West,Gary Rich.jpg",
  "posters/5A/Mckinley Rowe,Adriel Patton,Sonia Valencia.jpg",
  "posters/7D/Willie Hudson,Allen Barnett,Zachariah Wolfe.jpg",
  "posters/7A/Kenneth Beard,Austin Cline,Erika Flores.jpg",
  "posters/6D/Kamari Mcdowell,Steven Huang,Desirae Fuller.jpg",
  "posters/6E/Amare Yates,Rohan Moody,Lillie Ballard.jpg",
  "posters/6C/Brielle Byrd,Bailey Farmer,Riya Sheppard.jpg",
  "posters/4A/Melina Noble,Krista Armstrong,Cason Le.jpg",
  "posters/7A/Londyn Norton,Devon Bass,Cheyanne Thompson.jpg",
  "posters/5A/Jordan Knox,Heath Wells,Jordin Sellers.jpg",
  "posters/7E/Joaquin Tran,Ruth Bond,Fabian Flowers.jpg",
  "posters/7A/Cora Mccoy,Callum Gross,Yadiel Roman.jpg",
  "posters/4D/Khalil Horn,Magdalena Young,Kaia Huang.jpg",
  "posters/7E/Natalee Rodgers,Valerie Pena,Jagger Villanueva.jpg",
  "posters/4D/Noelle Jensen,Zaid Long,Triston Prince.jpg",
  "posters/5E/Reagan Graves,Micaela Butler,Keyon Wheeler.jpg",
  "posters/6E/Rosa Watson,Alexzander Mercado,Isaac Molina.jpg",
  "posters/6B/Theodore Rivera,Jaron Davies,Aspen Adams.jpg",
  "posters/5E/Amir Meadows,Jaqueline Yang,Kaelyn Guzman.jpg",
  "posters/4C/Evelyn Freeman,Kylee Bowen,Cale Ramsey.jpg",
  "posters/4E/Raina Howell,Amani Mosley,Kallie Glenn.jpg",
  "posters/4B/Salvador Price,Ansley Shepherd,Kyle Simpson.jpg",
  "posters/4A/Tessa Burnett,Dania Mcfarland,Kristina Alvarado.jpg",
  "posters/5C/Emerson Duarte,Cindy Hartman,Luciano Lee.jpg",
  "posters/4B/Albert Prince,River Forbes,Dayanara Garrett.jpg",
  "posters/4A/Campbell Underwood,Audrina Marshall,Joe Clements.jpg",
  "posters/4C/Efrain Hicks,Alexandra Church,Dominik Stephens.jpg",
  "posters/7B/Christian Downs,Liliana Ruiz,Lawrence Dennis.jpg",
  "posters/6A/Soren Roberts,Jayda Clay,Nash Soto.jpg",
  "posters/5A/Amy Ware,Bethany Hebert,Leyla Garza.jpg",
  "posters/4C/Leo Mckinney,Steven Byrd,Sage West.jpg",
  "posters/6A/Geovanni Gross,Maliyah Mathews,Nathanael Davidson.jpg",
  "posters/7E/Gregory Craig,Ryan Shelton,Brianna Johnson.jpg",
  "posters/5A/Mario Flowers,Jadyn Davidson,Rene Merritt.jpg",
  "posters/4C/Kendall Mcguire,Ayanna Patton,Clinton Meza.jpg",
  "posters/7E/Braedon Hernandez,Luna Barber,Audrey Christian.jpg",
  "posters/4B/Marley Kent,Josephine Boyle,Deven Landry.jpg",
  "posters/4E/Makaila Shah,Harold Gibbs,Cristian Frederick.jpg",
  "posters/7D/Brisa Benitez,Kirsten Cuevas,Ralph Hawkins.jpg",
  "posters/5B/Andreas Berger,Richard Juarez,Keagan Krueger.jpg",
  "posters/5E/Roman Cross,Jace Gonzales,Deborah Morrow.jpg",
  "posters/5A/Giana Sherman,Bridger Chase,Konnor Mccoy.jpg",
  "posters/5C/Cason Walters,Cullen Yoder,Janet Santiago.jpg",
  "posters/4D/Hugo Barry,Dereon Thompson,Roman Medina.jpg",
  "posters/6C/Olivia Vance,Hunter Meadows,Jakayla Hebert.jpg",
  "posters/7E/Ricardo Farrell,Sidney Johns,Charlize Delacruz.jpg",
  "posters/7B/Carlee Perkins,Finley Gutierrez,Micah Simpson.jpg",
  "posters/6C/Colin Davidson,Devon Hammond,Ada Wu.jpg",
  "posters/7D/Quinn Morrison,Holden Fox,Mylee Deleon.jpg",
  "posters/4D/Belinda Hart,Jaslyn Murphy,Lillie Johnston.jpg",
  "posters/5C/Valeria Ferguson,Marc Melendez,Jaylin Mann.jpg",
  "posters/5D/Landen Daugherty,Rafael Crawford,Willow Medina.jpg",
  "posters/7E/Marlon Contreras,Santino Spencer,Teresa Daniel.jpg",
  "posters/6D/Brent Cannon,Ashlynn Macdonald,Shelby Benitez.jpg",
  "posters/4B/Elsa Bradford,Darian Wilcox,Haven Barber.jpg",
  "posters/5A/Kennedy Carson,Alyvia Myers,Rebekah Sloan.jpg",
  "posters/6D/Trevin Duran,Phillip Dillon,Alexzander York.jpg",
  "posters/4A/Paisley Keller,Zara Bruce,Mya Macias.jpg",
  "posters/5B/Casey Small,Kailee Duncan,Henry Ellis.jpg",
  "posters/7C/Franklin Nichols,Braylen Reynolds,Kobe Hutchinson.jpg",
  "posters/4D/Devan Alexander,Annie Owens,Zaria Wells.jpg",
  "posters/6D/Tucker Blanchard,Bianca Sandoval,Konner Mcfarland.jpg",
  "posters/5E/Kendall Gill,Mckenzie Riggs,Karlee Mcknight.jpg",
  "posters/5B/Anabelle Prince,Eve Charles,Anabel Meyer.jpg",
  "posters/6B/Hazel Davies,Lea Bass,Angelina Cooper.jpg",
  "posters/7D/Ryann Cohen,Cruz Pittman,Thaddeus Mills.jpg",
  "posters/7A/Angelo Simon,Amirah Moon,Corey Lopez.jpg",
  "posters/6E/Zaiden Ray,Reuben Good,Darwin Wagner.jpg",
  "posters/4B/Hayden Fitzgerald,Talan Rice,Brodie Cochran.jpg",
  "posters/6C/Franco Hale,Paulina Harvey,Greta Nunez.jpg",
  "posters/4E/Destinee Manning,Mckinley Brennan,Damon Kim.jpg",
  "posters/4A/Jabari Oconnell,Elisabeth Gordon,Amy Cabrera.jpg",
  "posters/4A/Makayla Merritt,Jayden Palmer,Erick Beard.jpg",
  "posters/6C/Donald Jefferson,Anthony Wright,Marvin Rich.jpg",
  "posters/6C/Desirae Hardin,Avah West,Gary Rich.jpg",
  "posters/5A/Mckinley Rowe,Adriel Patton,Sonia Valencia.jpg",
  "posters/7D/Willie Hudson,Allen Barnett,Zachariah Wolfe.jpg",
  "posters/7A/Kenneth Beard,Austin Cline,Erika Flores.jpg",
  "posters/6D/Kamari Mcdowell,Steven Huang,Desirae Fuller.jpg",
  "posters/6E/Amare Yates,Rohan Moody,Lillie Ballard.jpg",
  "posters/6C/Brielle Byrd,Bailey Farmer,Riya Sheppard.jpg",
  "posters/4A/Melina Noble,Krista Armstrong,Cason Le.jpg",
  "posters/7A/Londyn Norton,Devon Bass,Cheyanne Thompson.jpg",
  "posters/5A/Jordan Knox,Heath Wells,Jordin Sellers.jpg",
  "posters/7E/Joaquin Tran,Ruth Bond,Fabian Flowers.jpg",
  "posters/7A/Cora Mccoy,Callum Gross,Yadiel Roman.jpg",
  "posters/4D/Khalil Horn,Magdalena Young,Kaia Huang.jpg",
  "posters/7E/Natalee Rodgers,Valerie Pena,Jagger Villanueva.jpg",
  "posters/4D/Noelle Jensen,Zaid Long,Triston Prince.jpg",
  "posters/5E/Reagan Graves,Micaela Butler,Keyon Wheeler.jpg",
  "posters/6E/Rosa Watson,Alexzander Mercado,Isaac Molina.jpg",
  "posters/6B/Theodore Rivera,Jaron Davies,Aspen Adams.jpg",
  "posters/5E/Amir Meadows,Jaqueline Yang,Kaelyn Guzman.jpg",
  "posters/4C/Evelyn Freeman,Kylee Bowen,Cale Ramsey.jpg",
  "posters/4E/Raina Howell,Amani Mosley,Kallie Glenn.jpg",
  "posters/4B/Salvador Price,Ansley Shepherd,Kyle Simpson.jpg",
  "posters/4A/Tessa Burnett,Dania Mcfarland,Kristina Alvarado.jpg",
  "posters/5C/Emerson Duarte,Cindy Hartman,Luciano Lee.jpg",
  "posters/4B/Albert Prince,River Forbes,Dayanara Garrett.jpg",
  "posters/4A/Campbell Underwood,Audrina Marshall,Joe Clements.jpg",
  "posters/4C/Efrain Hicks,Alexandra Church,Dominik Stephens.jpg",
  "posters/7B/Christian Downs,Liliana Ruiz,Lawrence Dennis.jpg",
  "posters/6A/Soren Roberts,Jayda Clay,Nash Soto.jpg",
  "posters/5A/Amy Ware,Bethany Hebert,Leyla Garza.jpg",
  "posters/4C/Leo Mckinney,Steven Byrd,Sage West.jpg",
  "posters/6A/Geovanni Gross,Maliyah Mathews,Nathanael Davidson.jpg",
  "posters/7E/Gregory Craig,Ryan Shelton,Brianna Johnson.jpg",
  "posters/5A/Mario Flowers,Jadyn Davidson,Rene Merritt.jpg",
  "posters/4C/Kendall Mcguire,Ayanna Patton,Clinton Meza.jpg",
  "posters/7E/Braedon Hernandez,Luna Barber,Audrey Christian.jpg",
  "posters/4B/Marley Kent,Josephine Boyle,Deven Landry.jpg",
  "posters/4E/Makaila Shah,Harold Gibbs,Cristian Frederick.jpg",
  "posters/7D/Brisa Benitez,Kirsten Cuevas,Ralph Hawkins.jpg",
  "posters/5B/Andreas Berger,Richard Juarez,Keagan Krueger.jpg",
];
