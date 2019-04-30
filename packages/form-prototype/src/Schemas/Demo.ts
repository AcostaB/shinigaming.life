import { schema } from 'normalizr';

// The first parameter will be the key for the normalized output. i.e. entities.people
export const person = new schema.Entity("people", {}, { idAttribute: "personID" });

export const apartment = new schema.Entity("apartments", {
  tenants: [person]
}, { idAttribute: "apartmentID" });

// TODO This could be typed better. idAttribute should be a property of the address model.
export const address = new schema.Entity("addresses", {}, { idAttribute: "addressID" });

export const building = new schema.Entity("buildings", {
  address,
  apartments: [apartment]
}, { idAttribute: "buildingID" });

export const location = new schema.Entity("locations", {
  address,
  buildings: [building]
});
