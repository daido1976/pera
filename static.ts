import { basename, join } from "./deps.ts";
import { PeraHandler } from "./router.ts";
import { serveFile } from "https://deno.land/std@0.173.0/http/file_server.ts";

const STATIC_PATH = "./public";

// TODO: http://localhost:8000/path/index.css にアクセスした時に not found にする（= /index.css の時しか返さない）
export const staticHandler: PeraHandler = (req) => {
  // TODO: If it is not GET method, return early.
  const toLocalPath = (path: string) => {
    const fileName = basename(path);
    const paths = [STATIC_PATH, fileName];
    if (path === "/") paths.push("index.html");
    return join(...paths);
  };

  const { pathname } = new URL(req.url);
  const path = toLocalPath(pathname);
  return serveFile(req, path);
};
