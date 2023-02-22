import { Pera } from "../../mod.ts";

const app = new Pera();

app.static("./static");

await app.run();
