import { Normalized, Keyed, Errors } from './main';
import { NormalizedEntity, NormalizedError, NormalizedEntities, NormalizedErrors } from './main';
import { Person } from '../Models/Person';
import { Building } from '../Models/Building';
import { Apartment } from '../Models/Apartment';

export interface DemoFormEntities {
  people: NormalizedEntity<Person>;
  buildings: NormalizedEntity<Building>;
  apartments: NormalizedEntity<Apartment>;
}

export interface DemoFormErrors {
  people: NormalizedError<Person>;
  buildings: NormalizedError<Building>;
  apartments: NormalizedError<Apartment>;
}
