export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];

// FunctionProperties
export type mappedDispatch<T> = Pick<T, FunctionPropertyNames<T>>;

export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

// NonFunctionProperties
export type mappedState<T> = Pick<T, NonFunctionPropertyNames<T>>;

