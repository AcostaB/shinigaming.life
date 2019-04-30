import React from 'react';

import { normalize, schema } from 'normalizr';
import Comparison from "./Comparison.js";

// Example from the source. Making use of the mergeStrategy. 
// Doesn't seem to do anything to actually showcase mergeStrategy.
const DemoExample2 = () => {

  // DEMO example 2
  const data = { id_str: '123', url: 'https://twitter.com', user: { id_str: '456', name: 'Jimmy' } };

  const user = new schema.Entity('users', {}, { idAttribute: 'id_str' });
  const tweet = new schema.Entity('tweets', { user2: user }, {
    idAttribute: 'id_str',
    // Apply everything from entityB over entityA, except for "favorites"
    mergeStrategy: (entityA, entityB) => ({
      ...entityA,
      ...entityB,
      favorites: entityA.favorites
    }),
    // Remove the URL field from the entity
    // processStrategy: (entity) => omit(entity, 'url')
  });

  const normalizedData = normalize(data, tweet);

  return (
    <Comparison before={data} after={normalizedData} title="Demo example 2 - Merge Strategy" />
  );
}

export default DemoExample2;
