import { serve } from "./deps.ts";
import { serverLog } from "./logger.ts";
import { PeraHandler, Router } from "./router.ts";

// NOTE: Supports only commonly used HTTP methods.
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
export class Pera {
  #router: Router = new Router();

  get(path: string, handler: PeraHandler) {
    this.#router.register("GET", path, handler);
  }

  post(path: string, handler: PeraHandler) {
    this.#router.register("POST", path, handler);
  }

  put(path: string, handler: PeraHandler) {
    this.#router.register("PUT", path, handler);
  }

  patch(path: string, handler: PeraHandler) {
    this.#router.register("PATCH", path, handler);
  }

  delete(path: string, handler: PeraHandler) {
    this.#router.register("DELETE", path, handler);
  }

  head(path: string, handler: PeraHandler) {
    this.#router.register("HEAD", path, handler);
  }

  options(path: string, handler: PeraHandler) {
    this.#router.register("OPTIONS", path, handler);
  }

  static(path: string) {
    this.#router.setStaticPath(path);
  }

  handler = (req: Request): Response | Promise<Response> => {
    const res = this.#router.resolve(req);
    serverLog(req, res);
    return res;
  };

  async run() {
    await serve(this.handler);
  }
}
