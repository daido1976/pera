import { Pera } from "./pera.ts";
import { describe, it, assertEquals } from "./dev_deps.ts";

describe("Basic", () => {
  const app = new Pera();
  app.get("/", (_req, res) => res.text("Hi"));
  app.post("/json", async (req, res) => {
    const json: { name: string } = await req.json();
    return res.json({
      message: `Hi, ${json.name}!`,
    });
  });

  it("should return 200 text response", async () => {
    const req = new Request("http://localhost");
    const res = await app.handler(req);
    assertEquals(res.status, 200);
    assertEquals(res.headers.get("Content-Type") as string, "text/plain");
    assertEquals(await res.text(), "Hi");
  });

  it("should return 200 JSON response", async () => {
    const req = new Request("http://localhost/json", {
      method: "POST",
      body: JSON.stringify({ name: "daido1976" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await app.handler(req);
    assertEquals(res.status, 200);
    assertEquals(res.headers.get("Content-Type") as string, "application/json");
    assertEquals(await res.json(), { message: "Hi, daido1976!" });
  });

  it("should return 404 response", async () => {
    const req = new Request("http://localhost/not_found");
    const res = await app.handler(req);
    assertEquals(res.status, 404);
    assertEquals(await res.text(), "not found");
  });
});

// See. https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
describe("RegExp", () => {
  const app = new Pera();
  app.get("/posts/:date(\\d+)/:title([a-z]+)", (req, res) => {
    const { date, title } = req.params;
    return res.json({ post: { date, title } });
  });
  app.get("/assets/:filename(.*.png)", (req, res) => {
    return res.json({ filename: req.params["filename"] });
  });

  it("should capture regexp path parameters", async () => {
    const req = new Request("http://localhost/posts/20221124/hello");
    const res = await app.handler(req);
    assertEquals(res.status, 200);
    assertEquals(await res.json(), {
      post: { date: "20221124", title: "hello" },
    });
  });

  it("should return 404 response", async () => {
    const req = new Request("http://localhost/posts/onetwothree/hello");
    const res = await app.handler(req);
    assertEquals(res.status, 404);
    const req2 = new Request("http://localhost/posts/20221124/123");
    const res2 = await app.handler(req2);
    assertEquals(res2.status, 404);
  });

  it("should capture the path parameter with the wildcard", async () => {
    const req = new Request("http://localhost/assets/image.png");
    const res = await app.handler(req);
    assertEquals(res.status, 200);
    assertEquals(await res.json(), {
      filename: "image.png",
    });
  });
});
