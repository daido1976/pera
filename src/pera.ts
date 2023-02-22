import { serve } from "./deps.ts";
import { serverLog } from "./logger.ts";
import { PeraHandler, Router } from "./router.ts";

// NOTE: Supports only commonly used HTTP methods.
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
export class Pera {
  #router: Router = new Router();

  /**
   * Adds a GET request route to the router with the specified path and handler function.
   *
   * @param path - The path to register the GET request.
   * @param handler - The function to handle the GET request.
   */
  get(path: string, handler: PeraHandler) {
    this.#router.register("GET", path, handler);
  }

  /**
   * Adds a POST request route to the router with the specified path and handler function.
   *
   * @param path - The path to register the POST request.
   * @param handler - The function to handle the POST request.
   */
  post(path: string, handler: PeraHandler) {
    this.#router.register("POST", path, handler);
  }

  /**
   * Adds a PUT request route to the router with the specified path and handler function.
   *
   * @param path - The path to register the PUT request.
   * @param handler - The function to handle the PUT request.
   */
  put(path: string, handler: PeraHandler) {
    this.#router.register("PUT", path, handler);
  }

  /**
   * Adds a PATCH request route to the router with the specified path and handler function.
   *
   * @param path - The path to register the PATCH request.
   * @param handler - The function to handle the PATCH request.
   */
  patch(path: string, handler: PeraHandler) {
    this.#router.register("PATCH", path, handler);
  }

  /**
   * Adds a DELETE request route to the router with the specified path and handler function.
   *
   * @param path - The path to register the DELETE request.
   * @param handler - The function to handle the DELETE request.
   */
  delete(path: string, handler: PeraHandler) {
    this.#router.register("DELETE", path, handler);
  }

  /**
   * Adds a HEAD request route to the router with the specified path and handler function.
   *
   * @param path - The path to register the HEAD request.
   * @param handler - The function to handle the HEAD request.
   */
  head(path: string, handler: PeraHandler) {
    this.#router.register("HEAD", path, handler);
  }

  /**
   * Adds an OPTIONS request route to the router with the specified path and handler function.
   *
   * @param path - The path to register the OPTIONS request.
   * @param handler - The function to handle the OPTIONS request.
   */
  options(path: string, handler: PeraHandler) {
    this.#router.register("OPTIONS", path, handler);
  }

  /**
   * Sets a custom static file path.
   *
   * @param path - The path to the custom static file.
   */
  static(path: string) {
    this.#router.setCustomStatic(path);
  }

  /**
   * Handles the request and returns a response object or a promise that resolves to a response object.
   *
   * @param req - The request object.
   * @returns The response object or a promise that resolves to a response object.
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
