import { PeraHandler } from "./router.ts";
import { serveDir } from "./deps.ts";

const STATIC_PATH = "./public";

export const staticHandler: PeraHandler = (req) => {
  return serveDir(req, { fsRoot: STATIC_PATH, quiet: true });
};
