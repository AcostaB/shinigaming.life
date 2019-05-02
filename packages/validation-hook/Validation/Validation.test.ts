import {
  constructValidatorsObject,
  constructValidationErrorsObject,
  containsValidationErrors,
  validateCollection,
  addValidationErrorToCollection,
  validateValue,
  syncPropertiesInCollections,
  mergeValidationErrors
} from './Validation';
import { Validators, ValidationErrors } from '../../Definitions/Validation';
import { required } from './Validators';
import { Keyed } from '../../Definitions/ARL';

interface MockObjectType {
  name: string,
  age: number,
  favColor: string
};

test('constructValidatorsObject creates object correctly.', () => {
  const mockObject: MockObjectType = {
    name: 'Mock User',
    age: 100,
    favColor: 'red'
  };

  const actualObject = constructValidatorsObject(mockObject);

  const actual1 = actualObject.name;
  const actual2 = actualObject.age;
  const actual3 = actualObject.favColor;

  const expected: string[] = [];

  expect(actual1).toEqual(expected);
  expect(actual2).toEqual(expected);
  expect(actual3).toEqual(expected);
});

interface MockObjectType2 {
  id: number,
  name: string,
  age: number,
  favColor: string
};

test('constructValidationErrorsObject creates object correctly.', () => {
  const mockObject: MockObjectType2[] = [
    {
      id: 1,
      name: 'Mock User',
      age: 100,
      favColor: 'red'
    }, {
      id: 2,
      name: 'Mock User 2',
      age: 200,
      favColor: 'blue'
    }
  ];

  const actualObject = constructValidationErrorsObject(mockObject, 'id');

  const actual1 = actualObject[1].name;
  const actual2 = actualObject[1].age;
  const actual3 = actualObject[1].favColor;

  const actual4 = actualObject[2].name;
  const actual5 = actualObject[2].age;
  const actual6 = actualObject[2].favColor;

  const expected: string[] = [];

  expect(actual1).toEqual(expected);
  expect(actual2).toEqual(expected);
  expect(actual3).toEqual(expected);

  expect(actual4).toEqual(expected);
  expect(actual5).toEqual(expected);
  expect(actual6).toEqual(expected);
});

test('The containsValidationErrors returns true for a collection with an error message.', () => {
  // TODO: Should this type be reworked? age is missing, but this is still
  // a valid object
  const mockValidationErrors: ValidationErrors<MockObjectType> = {
    1: {
      name: [],
      favColor: []
    },
    2: {
      name: [],
      favColor: []
    },
    3: {
      name: [],
      favColor: ['Required field.']
    }
  };

  const actual = containsValidationErrors(mockValidationErrors);
  const expected = true;

  expect(actual).toBe(expected);
});

test('The containsValidationErrors returns false for a collection with 0 error messages.', () => {
  // TODO: Should this type be reworked? age is missing, but this is still
  // a valid object
  const mockValidationErrors: ValidationErrors<MockObjectType> = {
    1: {
      name: [],
      favColor: []
    },
    2: {
      name: [],
      favColor: []
    },
    3: {
      name: [],
      favColor: []
    }
  };

  const actual = containsValidationErrors(mockValidationErrors);
  const expected = false;

  expect(actual).toBe(expected);
});

test('validateCollection correctly adds a validation message to the correct property using the required validator.', () => {
  const mockValidators: Validators<MockObjectType2> = {
    name: [required]
  };

  const mockCollection: Keyed<MockObjectType2> = {
    1: {
      id: 1,
      age: 100,
      name: 'mockUser1',
      favColor: 'blue'
    },
    2: {
      id: 2,
      age: 100,
      name: '',
      favColor: 'blue'
    }
  };

  const actualValidationErrors: ValidationErrors<MockObjectType2> = validateCollection(mockCollection, mockValidators);

  const actual1 = actualValidationErrors[1].id;
  const actual2 = actualValidationErrors[1].age;
  const actual3 = actualValidationErrors[1].name;
  const actual4 = actualValidationErrors[1].favColor;

  const actual5 = actualValidationErrors[2].id;
  const actual6 = actualValidationErrors[2].age;
  const actual7 = actualValidationErrors[2].name;
  const actual8 = actualValidationErrors[2].favColor;

  const expected1: string[] = [];
  const expected2: string[] = ['Required'];

  expect(actual1).toEqual(expected1);
  expect(actual2).toEqual(expected1);
  expect(actual3).toEqual(expected1);
  expect(actual4).toEqual(expected1);

  expect(actual5).toEqual(expected1);
  expect(actual6).toEqual(expected1);
  expect(actual7).toEqual(expected2); // Only this one should return the error message string.
  expect(actual8).toEqual(expected1);
});

test('addValidationErrorToCollection does not remove previously existing error messages.', () => {

  const mockValidationErrorsCollection: ValidationErrors<MockObjectType2> = {
    1: {
      age: ['Mock error message'],
      name: ['Mock error message']
    },
    2: {
      age: ['Mock error message'],
      name: ['Mock error message']
    }
  };

  const actualValidationErrors: ValidationErrors<MockObjectType2> = addValidationErrorToCollection(3, "name", [], mockValidationErrorsCollection);

  const actual1 = actualValidationErrors[1].age;
  const actual2 = actualValidationErrors[1].name;

  const actual3 = actualValidationErrors[2].age;
  const actual4 = actualValidationErrors[2].name;

  const expected: string[] = ['Mock error message'];

  expect(actual1).toEqual(expected);
  expect(actual2).toEqual(expected);

  expect(actual3).toEqual(expected);
  expect(actual4).toEqual(expected);
});

test('addValidationErrorToCollection adds a new blank error to previously existing error messages.', () => {

  const mockValidationErrorsCollection: ValidationErrors<MockObjectType2> = {
    1: {
      age: ['Mock error message'],
      name: ['Mock error message']
    },
    2: {
      age: ['Mock error message'],
      name: ['Mock error message']
    }
  };

  const actualValidationErrors: ValidationErrors<MockObjectType2> = addValidationErrorToCollection(3, "name", [], mockValidationErrorsCollection);

  const actual = actualValidationErrors[3].name;

  const expected: string[] = [];

  expect(actual).toEqual(expected);
});

test('addValidationErrorToCollection adds a new mocked error to previously existing error messages.', () => {

  const mockValidationErrorsCollection: ValidationErrors<MockObjectType2> = {
    1: {
      age: ['Mock error message'],
      name: ['Mock error message']
    },
    2: {
      age: ['Mock error message'],
      name: ['Mock error message']
    }
  };

  const actualValidationErrors: ValidationErrors<MockObjectType2> = addValidationErrorToCollection(3, "name", ['Mock error message'], mockValidationErrorsCollection);

  const actual = actualValidationErrors[3].name;

  const expected: string[] = ['Mock error message'];

  expect(actual).toEqual(expected);
});

test('validateValue correctly returns an array of error strings.', () => {
  const actual = validateValue('', [required]);
  const expected = 'Required';

  expect(actual[0]).toBe(expected);
});

test('validateValue correctly filters out null values in the error message string array.', () => {
  // Mock validator that always returns null.
  const mockValidator = (value: string) => null;

  const actual = validateValue('', [required, mockValidator]).length;
  const expected = 1;

  expect(actual).toBe(expected);
});

test('syncPropertiesInCollections properly removes an item from the errors collection.', () => {
  const mockCollection = {
    1: {
      age: 100,
      name: 'Bryand'
    },
    2: {
      age: 200,
      name: 'Gandalf'
    }
  };

  const mockValidationErrors = {
    1: {
      age: [],
      name: []
    },
    2: {
      age: [],
      name: []
    },
    3: {
      age: [],
      name: []
    }
  };

  const actual = syncPropertiesInCollections(mockCollection, mockValidationErrors)[3];
  const expected = undefined;

  expect(actual).toBe(expected);
});

test('syncPropertiesInCollections properly adds an item to the errors collection.', () => {
  const mockCollection = {
    1: {
      age: 100,
      name: 'Bryand'
    },
    2: {
      age: 200,
      name: 'Gandalf'
    },
    3: {
      age: 300,
      name: 'A very old dude'
    }
  };

  const mockValidationErrors = {
    1: {
      age: [],
      name: []
    },
    2: {
      age: [],
      name: []
    }
  };

  const actual = syncPropertiesInCollections(mockCollection, mockValidationErrors)[3];
  const expected = undefined;

  expect(actual).not.toBe(expected);
});

test('syncPropertiesInCollections properly adds an item and creates the relevant properties/keys with empty arrays.', () => {
  const mockCollection = {
    1: {
      age: 100,
      name: 'Bryand'
    },
    2: {
      age: 200,
      name: 'Gandalf'
    },
    3: {
      age: 300,
      name: 'A very old dude'
    }
  };

  const mockValidationErrors = {
    1: {
      age: [],
      name: []
    },
    2: {
      age: [],
      name: []
    }
  };

  const actual1 = syncPropertiesInCollections(mockCollection, mockValidationErrors)[3].age;
  const actual2 = syncPropertiesInCollections(mockCollection, mockValidationErrors)[3].name;
  const expected: string[] = [];

  expect(actual1).toEqual(expected);
  expect(actual2).toEqual(expected);
});

test('mergeValidationErrors correctly merges two collections of errors.', () => {
  const validationErrors_1 = {
    1: {
      prop1: [],
      prop2: ['Required']
    },
    2: {
      prop1: [],
      prop2: []
    }
  };

  const validationErrors_2 = {
    1: {
      prop1: ['Required'],
      prop2: []
    },
    2: {
      prop1: ['Required'],
      prop2: ['Required']
    }
  };

  const mergedResults = mergeValidationErrors([validationErrors_1, validationErrors_2]);

  const actual_1_1 = mergedResults[1].prop1;
  const actual_1_2 = mergedResults[1].prop2;

  const actual_2_1 = mergedResults[2].prop1;
  const actual_2_2 = mergedResults[2].prop2;

  const expected = ['Required'];

  expect(actual_1_1).toEqual(expected);
  expect(actual_1_2).toEqual(expected);
  expect(actual_2_1).toEqual(expected);
  expect(actual_2_2).toEqual(expected);
});

test('mergeValidationErrors correctly merges three collections of errors.', () => {
  const validationErrors_1 = {
    1: {
      prop1: ['Required'],
      prop2: ['Required']
    }
  };

  const validationErrors_2 = {
    3: {
      prop1: ['Required'],
      prop2: ['Required']
    }
  };

  const validationErrors_3 = {
    2: {
      prop1: ['Required'],
      prop2: ['Required']
    }
  };

  const mergedResults = mergeValidationErrors([validationErrors_1, validationErrors_2, validationErrors_3]);

  const actual_1_1 = mergedResults[1].prop1;
  const actual_1_2 = mergedResults[1].prop2;

  const actual_2_1 = mergedResults[2].prop1;
  const actual_2_2 = mergedResults[2].prop2;

  const actual_3_1 = mergedResults[3].prop1;
  const actual_3_2 = mergedResults[3].prop2;

  const expected = ['Required'];

  expect(actual_1_1).toEqual(expected);
  expect(actual_1_2).toEqual(expected);

  expect(actual_2_1).toEqual(expected);
  expect(actual_2_2).toEqual(expected);

  expect(actual_3_1).toEqual(expected);
  expect(actual_3_2).toEqual(expected);
});

test('mergeValidationErrors correctly merges two collections of errors when each collection has multiple errors.', () => {
  const validationErrors_1 = {
    1: {
      prop1: [],
      prop2: ['Required', 'Duplicate Loc and Bldg numbers found on another row.']
    },
    2: {
      prop1: [],
      prop2: []
    }
  };

  const validationErrors_2 = {
    1: {
      prop1: ['Required'],
      prop2: []
    },
    2: {
      prop1: ['Required'],
      prop2: ['Required']
    }
  };

  const mergedResults = mergeValidationErrors([validationErrors_1, validationErrors_2]);

  const actual_1_1 = mergedResults[1].prop1;
  const actual_1_2 = mergedResults[1].prop2;

  const actual_2_1 = mergedResults[2].prop1;
  const actual_2_2 = mergedResults[2].prop2;

  const expected_1_1 = ['Required'];
  const expected_1_2 = ['Required', 'Duplicate Loc and Bldg numbers found on another row.'];

  const expected_2_1 = ['Required'];
  const expected_2_2 = ['Required'];

  expect(actual_1_1).toEqual(expected_1_1);
  expect(actual_1_2).toEqual(expected_1_2);
  expect(actual_2_1).toEqual(expected_2_1);
  expect(actual_2_2).toEqual(expected_2_2);
});

test('mergeValidationErrors doesn\'t duplicate values when merging.', () => {
  const validationErrors_1 = {
    1: {
      prop1: [],
      prop2: ['Required', 'Duplicate Loc and Bldg numbers found on another row.']
    },
    2: {
      prop1: [],
      prop2: []
    }
  };

  const validationErrors_2 = {
    1: {
      prop1: ['Required'],
      prop2: ['Duplicate Loc and Bldg numbers found on another row.']
    },
    2: {
      prop1: ['Required'],
      prop2: ['Required']
    }
  };

  const mergedResults = mergeValidationErrors([validationErrors_1, validationErrors_2]);

  const actual_1_1 = mergedResults[1].prop1;
  const actual_1_2 = mergedResults[1].prop2;

  const actual_2_1 = mergedResults[2].prop1;
  const actual_2_2 = mergedResults[2].prop2;

  const expected_1_1 = ['Required'];
  const expected_1_2 = ['Required', 'Duplicate Loc and Bldg numbers found on another row.'];

  const expected_2_1 = ['Required'];
  const expected_2_2 = ['Required'];

  expect(actual_1_1).toEqual(expected_1_1);
  expect(actual_1_2).toEqual(expected_1_2);
  expect(actual_2_1).toEqual(expected_2_1);
  expect(actual_2_2).toEqual(expected_2_2);
});