import { Method, toMethod } from "./method.ts";
import { PeraRequest } from "./request.ts";
import { PeraResponse } from "./response.ts";
import { Static } from "./static.ts";

type Routes = Map<
  Method,
  {
    pattern: URLPattern;
    handler: PeraHandler;
  }[]
>;
export type PeraHandler = (
  req: PeraRequest,
  res: PeraResponse
) => Response | Promise<Response>;

export class Router {
  #routes: Routes = new Map();

  register(method: Method, path: string, handler: PeraHandler) {
    const current = this.#routes.get(method) ?? [];
    const pattern = new URLPattern({ pathname: path });
    this.#routes.set(method, [...current, { pattern, handler }]);
  }

  resolve(rawReq: Request): Response | Promise<Response> {
    const req = new PeraRequest(rawReq);
    const res = new PeraResponse();
    const method = toMethod(req.method);
    const paths = this.#routes.get(method) ?? [];
    const staticHandler = this.#static.handler;

    if (paths.length === 0) return staticHandler(req, res);

    const match = (
      url: string
    ): { handler: PeraHandler; result: URLPatternResult } | null => {
      const m = paths.find((p) => p.pattern.test(url));
      if (!m) return null;

      return {
        handler: m.handler,
        result: m.pattern.exec(url) as URLPatternResult,
      };
    };

    const matchPath = match(req.url);
    if (!matchPath) return staticHandler(req, res);

    req.params = matchPath.result.pathname.groups;
    req.query = Object.fromEntries(
      new URLSearchParams(matchPath.result.search.input)
    );
    return matchPath.handler(req, res);
  }

  // TODO: Since it is unnatural for Router class to know this, it might be a good idea to consider making it middleware.
  #static = new Static();

  setStaticPath(path: string) {
    this.#static.set(path);
  }
}
