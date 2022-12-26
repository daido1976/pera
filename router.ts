import { MicroRequest } from "./request.ts";
import { MicroResponse } from "./response.ts";
import { staticHandler } from "./static.ts";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
const defaultMethod = methods[0];
type Method = typeof methods[number];
type Routes = Map<
  Method,
  {
    pattern: URLPattern;
    handler: MicroHandler;
  }[]
>;
export type MicroHandler = (req: MicroRequest, res: MicroResponse) => Response;

export class Router {
  #routes: Routes;

  constructor() {
    this.#routes = new Map();
  }

  register(method: Method, path: string, handler: MicroHandler) {
    const current = this.#routes.get(method) ?? [];
    const pattern = new URLPattern({ pathname: path });
    this.#routes.set(method, [...current, { pattern, handler }]);
  }

  resolve(req: MicroRequest, res: MicroResponse): Response {
    console.debug("[DEBUG] routes: ", this.#routes);
    const method = this.#toMethod(req.method);
    const paths = this.#routes.get(method) ?? [];

    if (paths.length === 0) {
      return staticHandler(req, res);
    }

    const match = (
      url: string
    ): { handler: MicroHandler; result: URLPatternResult } | null => {
      const m = paths.find((p) => p.pattern.test(url));
      return m
        ? {
            handler: m.handler,
            result: m.pattern.exec(url) as URLPatternResult,
          }
        : null;
    };

    const matchPath = match(req.url);
    if (matchPath) {
      req.params = matchPath.result.pathname.groups;
      // TODO: support query
      return matchPath.handler(req, res);
    } else {
      return staticHandler(req, res);
    }
  }

  #toMethod(str: string): Method {
    // See. https://zenn.dev/hokaccha/articles/a665b7406b9773
    const isMethod = (s: string): s is Method => {
      return methods.includes(s as Method);
    };

    return isMethod(str) ? str : defaultMethod;
  }
}
