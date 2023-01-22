import { Method, toMethod } from "./method.ts";
import { PeraRequest } from "./request.ts";
import { PeraResponse } from "./response.ts";
import { staticHandler } from "./static.ts";

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
}