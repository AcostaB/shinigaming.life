import React from 'react';

import { normalize, schema, denormalize } from 'normalizr';
import Comparison from "./Comparison.js";
import data from "./TestData2.json";

// Same as test 2 but denormalizing test 4 with custom id names. 
const Test5 = () => {
  const address = new schema.Entity('addresses', {}, {idAttribute: "address_id"});

  const person = new schema.Entity('people', {addresses: [address]}, {idAttribute: "person_id"});

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
    <Comparison before={normalizedData} after={denormalizedData} title="Custom test 5 - Same as test 2 but denormalizing test 4 with custom id names. " />
  );
}

export default Test5;
