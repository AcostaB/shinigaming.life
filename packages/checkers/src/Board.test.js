import { createFreshBoard } from "./Board";

test("Starting board - [0][0] = 0", () =>
  expect(createFreshBoard()[0][0]).toBe(1));
test("Starting board - [0][1] = 1", () =>
  expect(createFreshBoard()[0][1]).toBe(0));
test("Starting board - [0][2] = 0", () =>
  expect(createFreshBoard()[0][2]).toBe(1));
test("Starting board - [6][7] = 2", () =>
  expect(createFreshBoard()[6][7]).toBe(0));
test("Starting board - [5][7] = 2", () =>
  expect(createFreshBoard()[5][7]).toBe(2));
