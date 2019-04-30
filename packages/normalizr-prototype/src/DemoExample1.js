import React from 'react';

import { normalize, schema } from 'normalizr';
import originalData from "./DemoExample1Data.json";
import Comparison from "./Comparison.js";

// Example from the source. Straight forward, simple normalization.
const DemoExample1 = () => {

  // Define a users schema -- Demo from source
  const user = new schema.Entity('users');

  // Define your comments schema -- Demo from source
  const comment = new schema.Entity('comments', {
    commenter: user
  });

  // Define your article -- Demo from source
  const article = new schema.Entity('articles', {
    author: user,
    comments: [comment]
  });

  const normalizedData = normalize(originalData, article);

  return (
    <Comparison before={originalData} after={normalizedData} title="Demo example 1 - simple normalization" />
  );
}

export default DemoExample1;
