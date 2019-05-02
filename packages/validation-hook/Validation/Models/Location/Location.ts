import { ValidationErrors } from './../../../../Definitions/Validation';
import { Location } from '../../../../Models/Location';
import { mapValues, keyBy, every } from 'lodash';
import { Keyed, KeyedBy } from './../../../../Definitions/ARL';
import { constructValidationErrorsObject } from '../../Validation';

export const uniqueLocBldgNum = (locations: Location[]): ValidationErrors<Location> => {

  // First, construct the validation errors object, but don't actually populate any of the fields. 
  const unpopulatedValidationErrors = constructValidationErrorsObject(locations, "ID");

  const keyedLocations: Keyed<Location> = keyBy(locations, "ID");

  // Since the collection is keyed by an ID, we need to loop through the layer indexed by the location ID.
  const validationErrors: ValidationErrors<Location> = mapValues(unpopulatedValidationErrors,
    (locationValidationErrors: KeyedBy<Location, string[]>, idAsIndex: any) => {

      const location_1: Location = keyedLocations[idAsIndex];

      // if the LocNum or BldgNum are empty, we are not going to compare this at all since the fields are required to begin with.
      if (location_1.LocNum === null || location_1.BldgNum === null) {
        return locationValidationErrors; // Return the original object since it should have no errors. 
      }

      // Now we need to start another loop to compare the current location to the other locations in the collection. If the loc and bldg
      // numbers match with another row, then we have a duplicate values validation error.
      const duplicateFound = !every(locations,
        (location_2: Location) =>
          // If comparing against self, always return true.
          location_1.ID === location_2.ID
          // Otherwise, compare locNum and BldgNum;
          || !(location_1.LocNum === location_2.LocNum && location_1.BldgNum === location_2.BldgNum)
      );

      if (duplicateFound) {
        return ({
          ...locationValidationErrors,
          LocNum: ['Duplicate Loc and Bldg numbers found on another row.'],
          BldgNum: ['Duplicate Loc and Bldg numbers found on another row.']
        })
      } else { return locationValidationErrors } // Else, return the original object since it should have no errors. 

    }) as ValidationErrors<Location>;

  return validationErrors;
}

export const consistentLocAddress = (locations: Location[]): ValidationErrors<Location> => {

  // First, construct the validation errors object, but don't actually populate any of the fields. 
  const unpopulatedValidationErrors = constructValidationErrorsObject(locations, "ID");

  const keyedLocations: Keyed<Location> = keyBy(locations, "ID");

  // Since the collection is keyed by an ID, we need to loop through the layer indexed by the location ID.
  const validationErrors: ValidationErrors<Location> = mapValues(unpopulatedValidationErrors,
    (locationValidationErrors: KeyedBy<Location, string[]>, idAsIndex: any) => {

      const location_1: Location = keyedLocations[idAsIndex];

      // if the LocNum is empty, we are not going to compare this at all since the field is required to begin with.
      if (location_1.LocNum === null) {
        return locationValidationErrors; // Return the original object since it should have no errors. 
      }

      // Now we need to start another loop to compare the current location to the other locations in the collection. 
      // If the loc number matches with another row BUT the address is different, then we have a validation error.
      const diffFound = !every(locations,
        (location_2: Location) =>
          // If comparing against self, always return true.
          location_1.ID === location_2.ID
          // Otherwise, compare locNum and BldgNum;
          || !(location_1.LocNum === location_2.LocNum) ||
          // Finally return true only if the address fields all match
          (location_1.StreetAddress === location_2.StreetAddress &&
            location_1.City === location_2.City &&
            location_1.StateCode === location_2.StateCode &&
            location_1.Zip === location_2.Zip &&
            location_1.County === location_2.County)
      );

      if (diffFound) {
        return ({
          ...locationValidationErrors,
          StreetAddress: ['Street address, city, state, zip, country must be identical for all buildings in a single location.']
        })
      } else { return locationValidationErrors } // Else, return the original object since it should have no errors. 

    }) as ValidationErrors<Location>;

  return validationErrors;
}
