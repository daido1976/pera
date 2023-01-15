import { serve } from "./deps.ts";
import { outputLog } from "./logger.ts";
import { MicroHandler, Router } from "./router.ts";

// TODO: supoort all HTTP methods
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
export class Pera {
  #router: Router = new Router();

  get(path: string, handler: MicroHandler) {
    this.#router.register("GET", path, handler);
  }

  post(path: string, handler: MicroHandler) {
    this.#router.register("POST", path, handler);
  }

  put(path: string, handler: MicroHandler) {
    this.#router.register("PUT", path, handler);
  }

  patch(path: string, handler: MicroHandler) {
    this.#router.register("PATCH", path, handler);
  }

  delete(path: string, handler: MicroHandler) {
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
