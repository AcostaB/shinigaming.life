import { LocationForm } from './../Components/LocationForm';
import { Normalized, Keyed, Errors } from './main';
import { NormalizedEntity, NormalizedError, NormalizedEntities, NormalizedErrors } from './main';
import { Person } from '../Models/Person';
import { Building } from '../Models/Building';
import { Apartment } from '../Models/Apartment';
import { Address } from '../Models/Address';
import { Location } from '../Models/Location';

export interface LocationFormEntities {
  addresses: NormalizedEntity<Address>;
  buildings: NormalizedEntity<Building>;
  locations: NormalizedEntity<Location>;
}

export interface LocationFormErrors {
  addresses: NormalizedError;
  buildings: NormalizedError;
  locations: NormalizedError;
}
