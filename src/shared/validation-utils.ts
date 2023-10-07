export function isNumberOutOfRange(
  value: number,
  min: number,
  max: number,
): boolean {
  return !value || value < min || value > max;
}

export function isStringOutOfRange(
  value: string,
  min: number,
  max: number,
): boolean {
  return !value || value.length < min || value.length > max;
}

export function isEmailValid(email: string) {
  return email.match(/^\S+@\S+\.\S+$/);
}
