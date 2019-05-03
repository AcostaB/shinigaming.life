import { DemoFormEntities, DemoFormErrors } from './DemoForm';
import { LocationFormEntities, LocationFormErrors } from './LocationForm';

export type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];

export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

/**
 * This type generates a union type that contains ONLY the property names of an object. 
 * The property names must be strings, not number or symbol.
 * e.g. NonFunctionPropertyNames<{color: string, age: number}> will return => 'color' | 'age'
 */
export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K extends string ? K : never
}[keyof T];

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type NormalizeOne<T> = T extends number
  ? number
  : T extends string
  ? string
  : T extends number[]
  ? number[]
  : T extends string[]
  ? string[]
  : T extends Function
  ? never
  : T extends Array<Object> ? number[] : T extends Object ? number : T; // not reached due to compiler issue

/**
 * Will convert the object to a normalized object similar to a table in a relational database.
 * Collection types like objects or arrays of objects will be mapped to 
 * a number or array of numbers, respectively. 
 */
export type Normalized<T> = { [K in keyof T]: NormalizeOne<T[K]> };

// Alternate solution from the same stack overflow answer:
// export type NormalizeOne<T> =
//   [T] extends [number]  number :
//   [T] extends [number ]  number  :
//   [T] extends [string]  string :
//   [T] extends [string ]  string  :
//   [T] extends [number[]]  number[] :
//   [T] extends [number[] ]  number[]  :
//   [T] extends [string[]]  string[] :
//   [T] extends [string[] ]  string[]  :
//   [T] extends [Function]  never :
//   [T] extends [Array<Object>]  number[] :
//   [T] extends [Array<Object> ]  number[]  :
//   [T] extends [Object]  number :
//   T;  // not reached due to compiler issue

/**
 * Indicates that a collection of objects have been keyed using a specified property, usually the ID.
 * A good example would be the keyBy method in the lodash api.
 */
export type Keyed<T> = { [id: number]: T };

export type Validator = (...param: any[]) => string | null;

// TODO improve on this. this should only constitute of primitive values (no objects or arrays), no functions
export type Errors<T> = { [K in keyof T]: string[] };
// TODO: this could potentially be a type
// export type DogFormChangeHandler<T> =

export type NormalizedEntity<T> = Keyed<Normalized<T>>;

// export type NormalizedError = Keyed<Errors<any>>;

export interface MainState {
  entities: {};
  contexts: {
    LocationForm: {
      entities: LocationFormEntities;
      // errors: LocationFormErrors;
    };
  };
}

// /**
//  * Generic function that builds change handlers through currying.
//  * C = Context, CA = Category, E = Entity, I = ID, F = Field, V = Value
//  **/
// export type ChangeHandlerBuilder = <
//   C extends keyof MainState["contexts"],
//   CA extends keyof MainState["contexts"][C],
//   E extends keyof MainState["contexts"][C][CA],
//   I extends number,
//   F extends keyof MainState["contexts"][C][CA][E][I],
//   V extends keyof MainState["contexts"][C][CA][E][I][F]>
//   (
//   context: C
// ) => (
//     category: CA
//   ) => (
//       entity: E
//     ) => (
//         id: I
//       ) => (
//           field: F
//         ) => (
//             value: V
//           ) => (prevState: MainState) => MainState;

/**
* Generic function that builds change handlers through currying.
* C = Context, CA = Category, E = Entity, I = ID, F = Field, V = Value
**/
export type ChangeHandlerBuilder = <
  C extends keyof MainState["contexts"]>

  (
  context: C
) => <CA extends keyof MainState["contexts"][C]>(
    category: CA
  ) => <E extends keyof MainState["contexts"][C][CA]>(
      entity: E
    ) => <I extends number>(
        id: I
      ) => <F extends keyof MainState["contexts"][C][CA][E][I]>(
          field: F
        ) => <V extends keyof MainState["contexts"][C][CA][E][I][F]>(
            value: V
          ) => (prevState: MainState) => MainState;