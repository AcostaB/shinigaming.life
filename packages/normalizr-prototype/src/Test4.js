import React from 'react';

import { normalize, schema } from 'normalizr';
import Comparison from "./Comparison.js";
import data from "./TestData2.json";

// Same as custom test 1, but using custom names for key strings. 
const Test4 = () => {
  // Second parameter has to be undefined or empty object. CANT BE NULL.
  const address = new schema.Entity('addresses', {}, {idAttribute: "address_id"});

  const person = new schema.Entity('people', {addresses: [address]}, {idAttribute: "person_id"});

  const favoriteMusicians = new schema.Array(person);

  // Because musicians are people and the person schema references people,
  // need to do this: 
  person.define({ favoriteMusicians: favoriteMusicians });

  // Normalizing my own test object.
  const normalizedData = normalize(data, [person]);

  return (
    <Comparison before={data} after={normalizedData} title="Custom test 4 - Same as custom test 1, but using custom names for key strings. " />
  );
}

export default Test4;
