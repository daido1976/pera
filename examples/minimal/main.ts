import { Pera } from "../../mod.ts";

const app = new Pera();

app.get("/", (_req, res) => res.text("Hi!"));

app.run();
