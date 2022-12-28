import { Pera } from "./pera.ts";
import { describe, it } from "https://deno.land/std@0.170.0/testing/bdd.ts";
import {
  assertEquals,
  assertMatch,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";

describe("Basic", () => {
  const app = new Pera();
  app.get("/", (_req, res) => res.text("Hi"));
  app.get("/json", (_req, res) =>
    res.json({
      message: "hello",
    })
  );
  app.get("*", () => {
    return new Response("Custom Not Found", {
      status: 404,
    });
  });

  it("should return 200 text response", async () => {
    const req = new Request("http://localhost");
    const res = app.handler(req);
    assertEquals(res.status, 200);
    assertMatch(res.headers.get("Content-Type") as string, /^text\/plain/);
    assertEquals(await res.text(), "Hi");
  });
});
