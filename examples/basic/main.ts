import { Pera } from "../../mod.ts";

const app = new Pera();

// NOTE: By default, files placed in directories under `./public` are automatically mounted and hosted in the root.
app.get("/hello", (_req, res) => res.text("Hello world"));
app.get("/hello/:id/*/:name", (req, res) =>
  res.text(`hello! ${req.params["id"]} ${req.params["name"]}`)
);
app.get("/another", (req, res) => res.text(`url: ${req.url}`));
app.post("/json", (_req, res) => res.json({ message: "posted" }));
app.patch("/json", (_req, res) => res.json({ message: "patched" }));
app.delete("/json", (_req, res) => res.json({ message: "deleted" }));
app.get("/redirect", (_req, res) => {
  return res.redirect("http://localhost:8000/redirected");
});
app.get("/redirected", (_req, res) => res.text("Redirected!"));

await app.run();
