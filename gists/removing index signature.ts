// source: https://github.com/Microsoft/TypeScript/issues/25987,     https://stackoverflow.com/questions/51954558/how-can-i-remove-a-wider-type-from-a-union-type-without-removing-its-subtypes-in/51955852#51955852

// THE EXPLANATION:
// @ferdaber That is amazing. The trick is in how infer works... it apparently 
// iterates through all the keys, both "known" (I'd call that "literal") keys and index keys, and then gives the union of the results. 
// That differs from doing T[keyof T] which only ends up extracting the index signature. Very good work.


type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never;

export interface JSONSchema4 {
  id?: string
  $ref?: string
  iAddedANumber?: number
  // to allow third party extensions
  [k: string]: any
}

type test = KnownKeys<JSONSchema4>;

type test2 = keyof JSONSchema4;

type KnownProperties = Exclude<keyof JSONSchema4, string | number>

type part1<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
}

type part1Test = part1<JSONSchema4>;



//////////////////////// MY own tests
type part1b<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : T[K]
}

type part1bTest = part1b<JSONSchema4>;

type KnownKeysB<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : T[K] // NOTICE THAT T[K] CAUSES IT TO FAIL!!!!
} extends { [_ in keyof T]: infer U } ? U : never;

type testB = KnownKeysB<JSONSchema4>;  // NOTICE THAT T[K] CAUSES IT TO FAIL!!!!

/// Attempting to get my previous test to work:

type part1c<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : T[K]
}

type part1cTest = part1b<JSONSchema4>;

/// My own attempt to solve my way
type mySolution = { [M in keyof part1cTest]: part1cTest[M] extends number ? never : M };

type SecondHalfC<First, T> = First extends { [_ in keyof T]: infer U } ? _ : never; // This is prob this approach wasnt taken. _ doesnt work. 

type secondHalfCTest = SecondHalfC<part1cTest, JSONSchema4>;

type KnownKeysC<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : T[K] // NOTICE THAT T[K] CAUSES IT TO FAIL!!!!
} extends { [_ in keyof T]: infer U } ? U : never;

type testC = KnownKeysC<JSONSchema4>;  // NOTICE THAT T[K] CAUSES IT TO FAIL!!!!

//////// Testing solution with mapping

type mapTest<T> = { [K in keyof T]: T[K] };

type mapTestA = mapTest<JSONSchema4>;


///// example for stack overflow

interface testExample2 {
  req: string
  opt: string
  [k: string]: any
}
type FirstHalf<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
}

type ValuesOf<T> = T extends { [_ in keyof T]: infer U } ? U : never
// or equivalently, since T here, and T in FirstHalf have the same keys,
// we can use T from FirstHalf instead:
type SecondHalf<First, T> = First extends { [_ in keyof T]: infer U } ? U : never;

type a = FirstHalf<testExample2>
//Output:
// type a = {
//     [x: string]: never;
//     req: "req";
//     opt?: "opt" | undefined;
// }
type a2 = ValuesOf<a> //  "req" | "opt" // Success!
type a2b = SecondHalf<a, testExample2> //  "req" | "opt" // Success!

// Substituting, to create a single type definition, we get @ferdaber's solution:
type KnownKeys2<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never;

type b = KnownKeys2<testExample2> //  "req" | "opt" // Absolutely glorious!