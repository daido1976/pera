import { format } from "./deps.ts";

export function outputLog(req: Request, res: Response) {
  const { pathname } = new URL(req.url);
  const method = req.method;

  console.log(
    `${format(new Date(), "yyyy-MM-dd HH:mm:ss")} ${method} ${pathname} ${
      res.status
    }`
  );
}
