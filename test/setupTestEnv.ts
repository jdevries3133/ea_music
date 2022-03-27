import { installGlobals } from "@remix-run/node/globals";
import "@testing-library/jest-dom/extend-expect";

installGlobals();

import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import prisma from "../app/prisma";

jest.mock("../app/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

declare global {
  var prismaMock: DeepMockProxy<PrismaClient>;
}

global.prismaMock = prismaMock;
