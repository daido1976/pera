import { PeraHandler } from "./router.ts";
import { serveDir } from "./deps.ts";

export class Static {
  #path = "./public";

  custom(path: string) {
    this.#path = path;
  }

  handler: PeraHandler = (req) => {
    return serveDir(req, { fsRoot: this.#path, quiet: true });
  };
}
