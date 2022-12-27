export class MicroResponse {
  #statusCode: number;

  constructor(status?: number) {
    this.#statusCode = status ?? 200;
  }

  status(status: number): MicroResponse {
    this.#statusCode = status;
    return this;
  }

  json(json: unknown): Response {
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(json);
    return new Response(body, { headers, status: this.#statusCode });
  }

  text(text: string): Response {
    const headers = {
      "Content-Type": "text/plain",
    };
    return new Response(text, { headers, status: this.#statusCode });
  }
}
