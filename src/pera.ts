import { serve } from "./deps.ts";
import { serverLog } from "./logger.ts";
import { PeraHandler, Router } from "./router.ts";

// NOTE: Supports only commonly used HTTP methods.
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
/**
 * Pera is a simple web framework that allows you to register handlers for various HTTP methods and serves them.
 * @class
 */
export class Pera {
  /**
   * Router instance for routing incoming HTTP requests.
   * @private
   */
  #router: Router = new Router();

  /**
   * Register a handler function for HTTP GET requests to the specified path.
   * @param {string} path - Path to register the handler for.
   * @param {PeraHandler} handler - Handler function to register.
   */
  get(path: string, handler: PeraHandler) {
    this.#router.register("GET", path, handler);
  }

  /**
   * Register a handler function for HTTP POST requests to the specified path.
   * @param {string} path - Path to register the handler for.
   * @param {PeraHandler} handler - Handler function to register.
   */
  post(path: string, handler: PeraHandler) {
    this.#router.register("POST", path, handler);
  }

  /**
   * Register a handler function for HTTP PUT requests to the specified path.
   * @param {string} path - Path to register the handler for.
   * @param {PeraHandler} handler - Handler function to register.
   */
  put(path: string, handler: PeraHandler) {
    this.#router.register("PUT", path, handler);
  }

  /**
   * Register a handler function for HTTP PATCH requests to the specified path.
   * @param {string} path - Path to register the handler for.
   * @param {PeraHandler} handler - Handler function to register.
   */
  patch(path: string, handler: PeraHandler) {
    this.#router.register("PATCH", path, handler);
  }

  /**
   * Register a handler function for HTTP DELETE requests to the specified path.
   * @param {string} path - Path to register the handler for.
   * @param {PeraHandler} handler - Handler function to register.
   */
  delete(path: string, handler: PeraHandler) {
    this.#router.register("DELETE", path, handler);
  }

  /**
   * Register a handler function for HTTP HEAD requests to the specified path.
   * @param {string} path - Path to register the handler for.
   * @param {PeraHandler} handler - Handler function to register.
   */
  head(path: string, handler: PeraHandler) {
    this.#router.register("HEAD", path, handler);
  }

  /**
   * Register a handler function for HTTP OPTIONS requests to the specified path.
   * @param {string} path - Path to register the handler for.
   * @param {PeraHandler} handler - Handler function to register.
   */
  options(path: string, handler: PeraHandler) {
    this.#router.register("OPTIONS", path, handler);
  }

  /**
   * Set custom static path for serving static files.
   * @param {string} path - Path to serve static files from.
   */
  static(path: string) {
    this.#router.setCustomStatic(path);
  }

  /**
   * Handler function for incoming HTTP requests that delegates requests to the appropriate registered handler function.
   * @param {Request} req - The incoming HTTP request object.
   * @returns {Response|Promise<Response>} The HTTP response object or a promise that resolves to it.
   */
  handler = (req: Request): Response | Promise<Response> => {
    const res = this.#router.resolve(req);
    serverLog(req, res);
    return res;
  };

  /**
   * Starts the server to listen for incoming requests.
   */
  async run() {
    await serve(this.handler);
  }
}
