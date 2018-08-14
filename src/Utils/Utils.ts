export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload };
}

// Source: https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575

export const convertMonthToYearMonthDisplay = (months: number) : string => {
  const totalYears = Math.floor(months/12);
  const totalMonths = months%12;

  let result: string = '';

  if (totalYears > 1) {
    result = totalYears + " yrs";
  } else if (totalYears === 1) {
    result = totalYears + " year";
  }

  if (totalYears && totalMonths) {
    result += " ";
  }

  if (totalMonths > 1) {
    result += totalMonths + " mos";
  } else if (totalMonths === 1) {
    result += totalMonths + " month";
  }

  return result;
}