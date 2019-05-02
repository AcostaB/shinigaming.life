import { uniqueLocBldgNum, consistentLocAddress } from './Location';
import { Location } from '../../../../Models/Location';

test('uniqueLocBldgNum correctly returns validation errors for duplicate rows.', () => {
  const location1: Location = new Location();
  location1.ID = 1
  location1.LocNum = 1;
  location1.BldgNum = 1;

  const location2: Location = new Location();
  location2.ID = 2
  location2.LocNum = 1;
  location2.BldgNum = 1;

  const locations = [location1, location2];

  const validationErrors = uniqueLocBldgNum(locations);

  const actual_1_1 = validationErrors[1].LocNum;
  const actual_1_2 = validationErrors[1].BldgNum;

  const actual_2_1 = validationErrors[2].LocNum;
  const actual_2_2 = validationErrors[2].BldgNum;

  const expected = ['Duplicate Loc and Bldg numbers found on another row.'];

  expect(actual_1_1).toEqual(expected);
  expect(actual_1_2).toEqual(expected);
  expect(actual_2_1).toEqual(expected);
  expect(actual_2_2).toEqual(expected);
});

test('uniqueLocBldgNum correctly returns no validation errors for unique rows.', () => {
  const location1: Location = new Location();
  location1.ID = 1
  location1.LocNum = 1;
  location1.BldgNum = 1;

  const location2: Location = new Location();
  location2.ID = 2
  location2.LocNum = 2;
  location2.BldgNum = 2;

  const locations = [location1, location2];

  const validationErrors = uniqueLocBldgNum(locations);

  const actual_1_1 = validationErrors[1].LocNum;
  const actual_1_2 = validationErrors[1].BldgNum;

  const actual_2_1 = validationErrors[2].LocNum;
  const actual_2_2 = validationErrors[2].BldgNum;

  const expected: string[] = [];

  expect(actual_1_1).toEqual(expected);
  expect(actual_1_2).toEqual(expected);
  expect(actual_2_1).toEqual(expected);
  expect(actual_2_2).toEqual(expected);
});

test('uniqueLocBldgNum correctly returns no validation errors when only loc num matches', () => {
  const location1: Location = new Location();
  location1.ID = 1
  location1.LocNum = 1;
  location1.BldgNum = 1;

  const location2: Location = new Location();
  location2.ID = 2
  location2.LocNum = 1;
  location2.BldgNum = 2;

  const locations = [location1, location2];

  const validationErrors = uniqueLocBldgNum(locations);

  const actual_1_1 = validationErrors[1].LocNum;
  const actual_1_2 = validationErrors[1].BldgNum;

  const actual_2_1 = validationErrors[2].LocNum;
  const actual_2_2 = validationErrors[2].BldgNum;

  const expected: string[] = [];

  expect(actual_1_1).toEqual(expected);
  expect(actual_1_2).toEqual(expected);
  expect(actual_2_1).toEqual(expected);
  expect(actual_2_2).toEqual(expected);
});

test('uniqueLocBldgNum correctly returns no validation errors when only building num matches', () => {
  const location1: Location = new Location();
  location1.ID = 1
  location1.LocNum = 1;
  location1.BldgNum = 2;

  const location2: Location = new Location();
  location2.ID = 2
  location2.LocNum = 2;
  location2.BldgNum = 2;

  const locations = [location1, location2];

  const validationErrors = uniqueLocBldgNum(locations);

  const actual_1_1 = validationErrors[1].LocNum;
  const actual_1_2 = validationErrors[1].BldgNum;

  const actual_2_1 = validationErrors[2].LocNum;
  const actual_2_2 = validationErrors[2].BldgNum;

  const expected: string[] = [];

  expect(actual_1_1).toEqual(expected);
  expect(actual_1_2).toEqual(expected);
  expect(actual_2_1).toEqual(expected);
  expect(actual_2_2).toEqual(expected);
});

test('uniqueLocBldgNum correctly returns no validation errors when values are null', () => {
  const location1: Location = new Location();
  location1.ID = 1
  location1.LocNum = null;
  location1.BldgNum = null;

  const location2: Location = new Location();
  location2.ID = 2
  location2.LocNum = null;
  location2.BldgNum = null;

  const locations = [location1, location2];

  const validationErrors = uniqueLocBldgNum(locations);

  const actual_1_1 = validationErrors[1].LocNum;
  const actual_1_2 = validationErrors[1].BldgNum;

  const actual_2_1 = validationErrors[2].LocNum;
  const actual_2_2 = validationErrors[2].BldgNum;

  const expected: string[] = [];

  expect(actual_1_1).toEqual(expected);
  expect(actual_1_2).toEqual(expected);
  expect(actual_2_1).toEqual(expected);
  expect(actual_2_2).toEqual(expected);
});

/*  consistentLocAddress   */

test('consistentLocAddress correctly returns validation errors when address is different for same loc number.', () => {
  const location1: Location = new Location();
  location1.ID = 1
  location1.LocNum = 1;
  location1.BldgNum = 1;
  location1.StreetAddress = "Street1"

  const location2: Location = new Location();
  location2.ID = 2
  location2.LocNum = 1;
  location2.BldgNum = 2;
  location2.StreetAddress = "Street2"

  const locations = [location1, location2];

  const validationErrors = consistentLocAddress(locations);

  const actual_1_1 = validationErrors[1].StreetAddress;
  const actual_2_1 = validationErrors[2].StreetAddress;

  const expected = ['Street address, city, state, zip, country must be identical for all buildings in a single location.'];

  expect(actual_1_1).toEqual(expected);
  expect(actual_2_1).toEqual(expected);
});

test('consistentLocAddress correctly returns no validation errors when all addresses are same per loc number.', () => {
  const location1: Location = new Location();
  location1.ID = 1
  location1.LocNum = 1;
  location1.BldgNum = 1;
  location1.StreetAddress = "StreetSame"

  const location2: Location = new Location();
  location2.ID = 2
  location2.LocNum = 1;
  location2.BldgNum = 2;
  location2.StreetAddress = "StreetSame"

  const locations = [location1, location2];

  const validationErrors = consistentLocAddress(locations);

  const actual_1_1 = validationErrors[1].StreetAddress;
  const actual_2_1 = validationErrors[2].StreetAddress;

  const expected: string[] = [];

  expect(actual_1_1).toEqual(expected);
  expect(actual_2_1).toEqual(expected);
});

test('consistentLocAddress also detects difference on city', () => {
  const location1: Location = new Location();
  location1.ID = 1
  location1.LocNum = 1;
  location1.BldgNum = 1;
  location1.StreetAddress = "StreetSame"
  location1.City = "City1"

  const location2: Location = new Location();
  location2.ID = 2
  location2.LocNum = 1;
  location2.BldgNum = 2;
  location2.StreetAddress = "StreetSame"
  location2.City = "City2"

  const locations = [location1, location2];

  const validationErrors = consistentLocAddress(locations);

  const actual_1_1 = validationErrors[1].StreetAddress;
  const actual_2_1 = validationErrors[2].StreetAddress;

  const expected = ['Street address, city, state, zip, country must be identical for all buildings in a single location.'];

  expect(actual_1_1).toEqual(expected);
  expect(actual_2_1).toEqual(expected);
});

test('consistentLocAddress also detects difference on state', () => {
  const location1: Location = new Location();
  location1.ID = 1
  location1.LocNum = 1;
  location1.BldgNum = 1;
  location1.StreetAddress = "StreetSame"
  location1.StateCode = "State1"

  const location2: Location = new Location();
  location2.ID = 2
  location2.LocNum = 1;
  location2.BldgNum = 2;
  location2.StreetAddress = "StreetSame"
  location2.StateCode = "State2"

  const locations = [location1, location2];

  const validationErrors = consistentLocAddress(locations);

  const actual_1_1 = validationErrors[1].StreetAddress;
  const actual_2_1 = validationErrors[2].StreetAddress;

  const expected = ['Street address, city, state, zip, country must be identical for all buildings in a single location.'];

  expect(actual_1_1).toEqual(expected);
  expect(actual_2_1).toEqual(expected);
});

test('consistentLocAddress also detects difference on zip', () => {
  const location1: Location = new Location();
  location1.ID = 1
  location1.LocNum = 1;
  location1.BldgNum = 1;
  location1.StreetAddress = "StreetSame"
  location1.Zip = "123"

  const location2: Location = new Location();
  location2.ID = 2
  location2.LocNum = 1;
  location2.BldgNum = 2;
  location2.StreetAddress = "StreetSame"
  location2.Zip = "456"

  const locations = [location1, location2];

  const validationErrors = consistentLocAddress(locations);

  const actual_1_1 = validationErrors[1].StreetAddress;
  const actual_2_1 = validationErrors[2].StreetAddress;

  const expected = ['Street address, city, state, zip, country must be identical for all buildings in a single location.'];

  expect(actual_1_1).toEqual(expected);
  expect(actual_2_1).toEqual(expected);
});

test('consistentLocAddress also detects difference on county', () => {
  const location1: Location = new Location();
  location1.ID = 1
  location1.LocNum = 1;
  location1.BldgNum = 1;
  location1.StreetAddress = "StreetSame"
  location1.County = "County1"

  const location2: Location = new Location();
  location2.ID = 2
  location2.LocNum = 1;
  location2.BldgNum = 2;
  location2.StreetAddress = "StreetSame"
  location2.County = "County2"

  const locations = [location1, location2];

  const validationErrors = consistentLocAddress(locations);

  const actual_1_1 = validationErrors[1].StreetAddress;
  const actual_2_1 = validationErrors[2].StreetAddress;

  const expected = ['Street address, city, state, zip, country must be identical for all buildings in a single location.'];

  expect(actual_1_1).toEqual(expected);
  expect(actual_2_1).toEqual(expected);
});

