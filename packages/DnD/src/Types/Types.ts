export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];

// FunctionProperties
export type MappedDispatch<T> = Pick<T, FunctionPropertyNames<T>>;

export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

// NonFunctionProperties
export type MappedState<T> = Pick<T, NonFunctionPropertyNames<T>>;

// -----

type FunctionType = (...args: any[]) => any;

type ActionCreatorsMapObject = { [actionCreater: string]: FunctionType};

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;