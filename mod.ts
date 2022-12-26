import { serve } from "./deps.ts";
import { outputLog } from "./logger.ts";
import { MicroRequest } from "./request.ts";
import { MicroResponse } from "./response.ts";
import { MicroHandler, Router } from "./router.ts";

// TODO: supoort all HTTP methods
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
export class App {
  #router: Router;
  #response: MicroResponse;

  constructor() {
    this.#router = new Router();
    this.#response = new MicroResponse();
  }

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

  async run() {
    const handler = (req: MicroRequest) => {
      const res = this.#router.resolve(req, this.#response);
      outputLog(req, res);
      return res;
    };

    await serve(handler);
  }
}
