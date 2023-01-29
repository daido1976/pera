import { format } from "./deps.ts";
import * as logger from "https://deno.land/std@0.175.0/log/mod.ts";

export async function serverLog(
  req: Request,
  res: Response | Promise<Response>
) {
  const { pathname } = new URL(req.url);
  const method = req.method;
  const response = await res;

  logger.info(
    `[${format(new Date(), "yyyy-MM-dd HH:mm:ss")}] [${method}] ${pathname} ${
      response.status
    }`
  );
}
