import React from 'react';

import { normalize, schema } from 'normalizr';
import Comparison from "./Comparison.js";
import data from "./TestData1.json";

// Custom test for large objects, including one that is recursive: person and favoriteMusician
const Test1 = () => {
  const address = new schema.Entity('addresses');

  const person = new schema.Entity('people', {
    addresses: [address]
  });

  const favoriteMusicians = new schema.Array(person);

  // Because musicians are people and the person schema references people,
  // need to do this: 
  person.define({ favoriteMusicians: favoriteMusicians });

  // Normalizing my own test object.
  const normalizedData = normalize(data, [person]);

  return (
    <Comparison before={data} after={normalizedData} title="Custom test 1 - Large object and recursive (person and favoriteMusician)" />
  );
}

export default Test1;
