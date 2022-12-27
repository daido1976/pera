export class MicroRequest extends Request {
  params: { [key: string]: string } = {};
  query: { [key: string]: string | string[] } = {};

  constructor(rawReq: Request) {
    super(rawReq);
  }
}
