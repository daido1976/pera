import { PeraHandler } from "./router.ts";
import { serveDir } from "https://deno.land/std@0.173.0/http/file_server.ts";

const STATIC_PATH = "./public";

export const staticHandler: PeraHandler = (req) => {
  return serveDir(req, { fsRoot: STATIC_PATH, quiet: true });
};
