import { Validator, Validators, ValidationErrors } from '../../Definitions/Validation';
import { NonFunctionPropertyNames } from '../../Definitions/ARL';
import { Keyed, KeyedBy } from '../../Definitions/ARL';
import { map, mapValues, keyBy, every, filter, reduce, mergeWith, isArray, uniq } from 'lodash';

/** 
 * Use this function to construct a key value pair object where the keys are the property names of <T>
 * and the values are the respective validators for that key. This function will simply construct the object,
 * so all keys will contain empty arrays as the value.
 */
export const constructValidatorsObject = <T extends object>(object: T): Validators<T> => {
  return mapValues(object, () => []) as any;
}

// TODO this needs to be tested against an emptry collection passed in. 
/** 
 * Use this function to construct a key value pair object where the keys are the property names of <T>
 * and the values are the respective error messages for that key. This function will simply construct the object,
 * so all keys will contain empty arrays as the value.
 */
export const constructValidationErrorsObject = <T extends object>(objects: T[], idFieldName: string): ValidationErrors<T> => {
  const mappedValidatorErrors = mapValues(objects[0], () => []);

  return mapValues(keyBy(objects, idFieldName), () => mappedValidatorErrors) as any;
}

/**
 * Runs all the validations with the value provided. Null values will be filtered out. 
 */
export const validateValue = (value: any, validators: Validator[]) => {
  const validationErrors: string[] = filter(map(validators, (validator) => validator(value)), (validationError: string | null) => validationError !== null) as string[];

  return validationErrors;
}

/**
 * The collection object is expected to be keyed by an ID.
 * @param collection 
 * @param validators 
 */
export const validateCollection = <T extends object>(collection: Keyed<T>, validators: Validators<T>): ValidationErrors<T> => {
  // Since the collection object is expected to be keyed by an ID, we need to loop through two layers. Here we are looping through
  // the first layer.
  const validationErrors: ValidationErrors<T> = mapValues(collection,
    // Here we start looping through the second layer, which is the object properties.
    (object: T) => mapValues(object, (propertyValue: any, propertyName: string) => {
      // Here we need to do another loop so that we run ALL the designated validators for that property.
      // We access the correct validators using the propertyName, and pass the validators the propertyValue.
      const _validationErrors: Array<string | null> = map(validators[propertyName], (validator: Validator) => validator(propertyValue));

      // Since the map function will return populated by strings and nulls, we need to filter out the nulls.
      const _filteredValidationErrors: string[] = filter(_validationErrors, (value) => value !== null) as string[];

      return _filteredValidationErrors;
    })) as ValidationErrors<T>;

  return validationErrors;
}

// TODO write unit test for empty validationErrors argument
export const addValidationErrorToCollection = <T>(
  id: number,
  propertyName: NonFunctionPropertyNames<T>,
  validationErrors: string[],
  validationErrorsCollection: ValidationErrors<T>
): ValidationErrors<T> => {
  return {
    ...validationErrorsCollection,
    [id]: {
      ...validationErrorsCollection[id],
      [propertyName]: validationErrors
    }
  }
}

export const containsValidationErrors = <T>(validationErrorsCollection: ValidationErrors<T>): boolean => {
  // Error messages are indexed first by the object id, then by the individual property. 
  // So need to loop through two layers. 

  const collectionContainsErrors: boolean =
    // First layer. Loop through the IDs.
    !every(validationErrorsCollection, (collectionByID: KeyedBy<T, string[]>) =>
      // Second layer. Loop through the errors listed by key. (The keys are the property names in <T>)
      every(collectionByID,
        // If the lenght of the array is greater than 0, that means there is a validation error message. Hence 
        // containsValidationErrors should return true, it contains errors. 
        (errorsByPropertyName: string[]) => errorsByPropertyName.length === 0));

  return collectionContainsErrors;
}

/**
 * If the data collection adds or removes an item, need to make sure the errors collection is synced up in terms of keys. 
 * E.g. if an item is removed from the data collection, it should also be removed from the errors collection so 
 * it is not evaluated when checking the whole collection for errors. 
 */
export const syncPropertiesInCollections = <T>(collection: Keyed<T>, validationErrorsCollection: ValidationErrors<T>) => {
  // If an errorMessage key exists in validationErrorsCollection but not in collection, then it will not be 
  // part of the new syncedCollectionObject. 
  const syncedCollection: ValidationErrors<T> = mapValues(collection, (item, key) => !!validationErrorsCollection[key] ? validationErrorsCollection[key] : mapValues((item as any), () => []));
  // If the errors collection entry doesn't exist, it means the location was just added. Insert new validationError object into
  // error collection.

  return syncedCollection;
};

// Pulled from lodash documentation: https://lodash.com/docs/4.17.11#mergeWith
const _customizer = (objValue: any, srcValue: any): any => {
  if (isArray(objValue)) {
    return uniq(objValue.concat(srcValue));
  }
}

export const mergeValidationErrors = <T>(validationErrorsArray: Array<ValidationErrors<T>>): ValidationErrors<T> => {
  const reduced = reduce(validationErrorsArray, (result, validationErrors) => {
    const mergedResult = mergeWith(result, validationErrors, _customizer);
    return mergedResult;
  }, {});

  return reduced;
}