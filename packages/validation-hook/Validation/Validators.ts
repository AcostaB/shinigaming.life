export const required = (value: string | number | null | undefined): null | string => {
  // If value is falsey, then this validation fails. 
  return (!value && value !== 0) ? 'Required' : null;
};

export const exactLength = (length: number) => (value: string | number | null | undefined): null | string => {
  // If value is null or undefined, do nothing. The required validator will determine if error is necessary.
  if (value === undefined || value === null) {
    return null;
  }

  // If length does not match specified length, return error message.
  if (value === undefined || value === null || String(value).length !== length) {
    return 'Value must be ' + String(length) + ' characters long';
  }
  return null;
};

export const minValue = (minimum: number) => (value: string | number | null | undefined): null | string => {
  // Ignoring null and empty, if value is less than the min value, then this validation fails. 
  if ((!value && value !== 0) || isNaN(Number(value))) {
    return null;
  }
  if (!(Number(value) >= minimum)) {
    return 'Value must be greater than or equal to ' + String(minimum);
  }
  return null;
};

export const maxValue = (maximum: number) => (value: string | number | null | undefined): null | string => {
  // Ignoring null and empty, if value is greater than the max value, then this validation fails. 
  if ((!value && value !== 0) || isNaN(Number(value))) {
    return null;
  }
  if (!(Number(value) <= maximum)) {
    return 'Value must be less than or equal to ' + String(maximum);
  }
  return null;
};

export const between = (minimum: number, maximum: number) => (value: string | number | null | undefined): null | string => {
  // Ignoring null and empty, if value is less than the min value or greater than the max value, then this validation fails. 
  if ((!value && value !== 0) || isNaN(Number(value))) {
    return null;
  }
  if (!(Number(value) >= minimum && Number(value) <= maximum)) {
    return 'Value must be between ' + String(minimum) + ' and ' + String(maximum);
  }
  return null;
};