import { format } from "./deps.ts";

export async function outputLog(
  req: Request,
  res: Response | Promise<Response>
) {
  const { pathname } = new URL(req.url);
  const method = req.method;
  const response = await res;

  console.log(
    `${format(new Date(), "yyyy-MM-dd HH:mm:ss")} ${method} ${pathname} ${
      response.status
    }`
  );
}
