import { isDefinedForEntry } from "../util.ts";
import { assertEquals, describe, it } from "../deps.ts";

describe("isDefinedForEntry", () => {
  it("should return true when second element is defined", () => {
    const result = isDefinedForEntry([1, 2]);
    assertEquals(result, true);
  });

  it("should return false when second element is undefined", () => {
    const result = isDefinedForEntry([1, undefined]);
    assertEquals(result, false);
  });

  it("should work with different data types", () => {
    const stringTest = isDefinedForEntry(["hello", "world"]);
    const nullTest = isDefinedForEntry([null, null]);
    assertEquals(stringTest, true);
    assertEquals(nullTest, true); // Since null is not undefined, it should return true
  });
});
