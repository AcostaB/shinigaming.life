import React from 'react';

import { normalize, schema, denormalize } from 'normalizr';
import Comparison from "./Comparison.js";
import data from "./TestData1.json";

// Denormalizing test 1 data from the lowest level, person.
const Test2 = () => {
  const address = new schema.Entity('addresses');

  const person = new schema.Entity('people', {
    addresses: [address]
  });

  const favoriteMusicians = new schema.Array(person);

  // Because musicians are people and the person schema references people,
  // need to do  
  person.define({ favoriteMusicians: favoriteMusicians });

  // Normalizing my own test object.
  const normalizedData = normalize(data, [person]);

  // Necessary to denormalize?
  const myPeopleSchema = { people: [person] }

  // Denormalizing data at the lowest level, people.
  const denormalizedData = denormalize(
    { people: normalizedData.result },
    myPeopleSchema,
    normalizedData.entities
  );

  return (
    <Comparison before={normalizedData} after={denormalizedData} title="Custom test 2 - Denormalizing test 1 data from the lowest level, person." />
  );
}

export default Test2;
