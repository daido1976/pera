import { serve } from "./deps.ts";
import { outputLog } from "./logger.ts";
import { PeraHandler, Router } from "./router.ts";

// TODO: supoort all HTTP methods
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

  handler = (req: Request): Response | Promise<Response> => {
    const res = this.#router.resolve(req);
    // TODO: suppress on test
    outputLog(req, res);
    return res;
  };

  async run() {
    await serve(this.handler);
  }
}
