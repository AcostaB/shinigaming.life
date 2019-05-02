import { required, exactLength } from './Validators';

test('Required validator returns null when passed in a valid number.', () => {
  const actual = required(123);
  const expected = null;

  expect(actual).toBe(expected);
});

test('Required validator returns null when passed in a valid string.', () => {
  const actual = required('Some awesome string.');
  const expected = null;

  expect(actual).toBe(expected);
});

test('Required validator returns an error string when passed in an empty string.', () => {
  const actual = required('');
  const expected = "Required";

  expect(actual).toBe(expected);
});

test('Required validator returns an error string when passed in null.', () => {
  const actual = required(null);
  const expected = "Required";

  expect(actual).toBe(expected);
});

test('Required validator returns an error string when passed in undefined', () => {
  const actual = required(undefined);
  const expected = "Required";

  expect(actual).toBe(expected);
});

test('exactLength validator does not return an error string when passed in undefined', () => {
  const actual = exactLength(5)(undefined);
  const expected = null;

  expect(actual).toBe(expected);
});

test('exactLength validator does not return error string when passed in null', () => {
  const actual = exactLength(4)(null);
  const expected = null;

  expect(actual).toBe(expected);
});

test('exactLength validator returns an error string when passed in string that is too short', () => {
  const actual = exactLength(5)('hi');
  const expected = "Value must be 5 characters long";

  expect(actual).toBe(expected);
});

test('exactLength validator returns an error string when passed in string that is too long', () => {
  const actual = exactLength(5)('hello world');
  const expected = "Value must be 5 characters long";

  expect(actual).toBe(expected);
});

test('exactLength validator does not return error for correct length', () => {
  const actual = exactLength(5)('00989');
  const expected = null;

  expect(actual).toBe(expected);
});

test('exactLength validator does not return error for correct length (number type)', () => {
  const actual = exactLength(5)(98765);
  const expected = null;

  expect(actual).toBe(expected);
});

test('exactLength validator does not return error for length 1, value 0. ', () => {
  const actual = exactLength(1)(0);
  const expected = null;

  expect(actual).toBe(expected);
});

test('exactLength validator does not return error for length 1, value "0". ', () => {
  const actual = exactLength(1)('0');
  const expected = null;

  expect(actual).toBe(expected);
});