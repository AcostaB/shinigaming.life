import { DemoFormEntities, DemoFormErrors } from './DemoForm';
import { LocationFormErrors, LocationFormEntities } from './LocationForm';

// export interface Context {
//   [contextName: string]: {
//     entities: NormalizedEntities;
//     errors: NormalizedErrors;
//   };
// }

// export interface AppState {
//   entities: NormalizedEntities;
//   contexts: Context
// }

// TODO better handle these optional parameters. Should they be optional?
// TODO Better export type the contexts parameter
export interface MainState {
  entities: {};
  contexts: {
    DemoForm: {
      entities: DemoFormEntities;
      errors: DemoFormErrors;
    };
    LocationForm: {
      entities: LocationFormEntities;
      errors: LocationFormErrors;
    };
  };
}

// export type Safe<T> = { [K in keyof T]: T[K] extends undefined ? never : T[K] };
// export type Safe2<T> = { [K in keyof T]: Exclude<T[K], undefined> };
// export type Safe3<T> = { [K in keyof T]: number[] };
// export type Safe4<T> = Exclude<T, undefined>;

// export type Required<T> = Exclude<T, undefined>;

export type test1 = keyof Required<MainState>;
export type test2 = keyof MainState["contexts"];
export type test3 = Required<keyof MainState["contexts"]>;
export type test4 = keyof Required<MainState["contexts"]>;
export type test5 = keyof Required<Required<MainState["contexts"]>[test4]>;
export type test6 = Required<Required<MainState>["contexts"]>;
// export type test7 = Required<Required<MainState["contexts"]>[test6]>;

// export type test33 = Safe<{
//   propertyName?: string;
// }>;
// export type test332 = Required<{
//   propertyName?: string;
//   otherProperty?: {
//     nested?: {
//       nestedAgain?: string;
//     };
//   };
// }>;
// export type test333 = Safe3<{
//   propertyName?: string;
// }>;
// export type test334 = Safe4<{
//   propertyName?: string;
// }>;

/**
 * Generic function that builds change handlers through currying.
 * C = Context, CA = Category, E = Entity, I = ID, F = Field, V = Value
 **/
export type ChangeHandlerBuilder = <
  C extends keyof MainState["contexts"],
  CA extends keyof MainState["contexts"][C],
  E extends keyof MainState["contexts"][C][CA],
  I extends keyof MainState["contexts"][C][CA][E],
  F extends keyof MainState["contexts"][C][CA][E][I],
  V extends keyof MainState["contexts"][C][CA][E][I][F]>
  (
  context: C
) => (
    category: CA
  ) => (
      entity: E
    ) => (
        id: I
      ) => (
          field: F
        ) => (
            value: V
          ) => (prevState: MainState) => MainState;

type testa = keyof MainState["contexts"];
type testb = keyof MainState["contexts"]['DemoForm'];
type testc = keyof MainState["contexts"]['DemoForm']['entities'];
type testc1 = keyof MainState["contexts"]['LocationForm']['entities'];
type testd = keyof MainState["contexts"]['LocationForm']['entities']['addresses'];
type teste = keyof MainState["contexts"]['LocationForm']['entities']['addresses'][1];
type testf = keyof MainState["contexts"]['LocationForm']['entities']['addresses'][1]['line1'];

// TODO: Issues:
//    1. field needs better typing.
//    2. when doing validation change, i can modify more than one field at a time.
//  X 3. Need to specify the id of the field.
//    4. I'm passing in errors, but it might be a new value or an array of errors.
//    5. New value is of type any.
export const changeHandlerBuilder: ChangeHandlerBuilder = context => category => entity => id => field => value => prevState => {
  // TODO: need to deal with the calculated types in here.
  const prevStateAsRequired = prevState as typeof prevState;

  const safeContexts = (prevState.contexts !== undefined
    ? prevStateAsRequired.contexts
    : {}) as any;
  // : {}) as Required<typeof prevStateAsRequired.contexts>;

  const safeContext: any =
    safeContexts[context] !== undefined ? safeContexts[context] : {};

  const safeCategory: any =
    safeContext[category] !== undefined ? safeContext[category] : {};

  const safeEntity: any =
    safeCategory[entity] !== undefined ? safeCategory[entity] : {};

  const safeID: any = safeEntity[id] !== undefined ? safeEntity[id] : {};

  return {
    ...prevState,
    contexts: {
      ...prevState.contexts,
      [context]: {
        ...safeContext,
        [category]: {
          ...safeCategory,
          [entity]: {
            ...safeEntity,
            [id]: {
              ...safeID,
              [field]: value
            }
          }
        }
      }
    }
  };
};

// var testing1 = changeHandlerBuilder('LocationForm');
// var testing2 = changeHandlerBuilder('LocationForm')('entities');
// var testing3 = changeHandlerBuilder('LocationForm')('entities')('buildings');

// interface somenumbers {
//   five: number
// }

// interface ifive extends somenumbers {
//   five: 3
// }

// const five1: somenumbers = { five: 123 };
// const five2: ifive = { five: 3 };

// five2.five;

// export interface LocationFormEntities2 {
//   addresses: NormalizedEntities<Address>;
//   buildings: NormalizedEntities<Building>;
//   locations: NormalizedEntities<Location>;
// }

// export interface LocationFormErrors2 extends NormalizedErrors {
//   addresses: Keyed<Errors<Address>>;
//   buildings: Keyed<Errors<Building>>;
//   locations: Keyed<Errors<Location>>;
// }

// type test234234 = Omit<LocationFormErrors2, "buildings">;
// type test234232434 = Omit<LocationFormEntities2, "buildings">;

// type test2342342 = LocationFormErrors2;

// type cleaned = keyof LocationFormErrors2;