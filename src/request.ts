export class PeraRequest extends Request {
  params: { [key: string]: string } = {};
  query: { [key: string]: string } = {};

  constructor(rawReq: Request) {
    super(rawReq);
  }
}
