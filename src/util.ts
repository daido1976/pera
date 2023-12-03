export function isDefinedForEntry<T>(
  input: [T, T | undefined]
): input is [T, T] {
  return input[1] !== undefined;
}
