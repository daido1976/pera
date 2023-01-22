const methods = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
] as const;
const defaultMethod = methods[0];

export type Method = typeof methods[number];

export function toMethod(str: string): Method {
  // See. https://zenn.dev/hokaccha/articles/a665b7406b9773
  const isMethod = (s: string): s is Method => {
    return methods.includes(s as Method);
  };

  return isMethod(str) ? str : defaultMethod;
}
