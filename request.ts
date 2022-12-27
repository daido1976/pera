export class MicroRequest extends Request {
  #_params: { [key: string]: string } = {};
  #_query: { [key: string]: string | string[] } = {};

  constructor(rawReq: Request) {
    super(rawReq);
  }

  set params(v: { [key: string]: string }) {
    this.#_params = v;
  }

  get params() {
    return this.#_params;
  }

  set query(v: { [key: string]: string | string[] }) {
    this.#_query = v;
  }

  get query() {
    return this.#_query;
  }
}
