// TODO: Support more utility methods.(e.g. redirect/html)
export class PeraResponse {
  #statusCode = 200;

  status(status: number): PeraResponse {
    this.#statusCode = status;
    return this;
  }

  json(json: unknown): Response {
    return Response.json(json, { status: this.#statusCode });
  }

  text(text: string): Response {
    const headers = {
      "Content-Type": "text/plain",
    };
    return new Response(text, { headers, status: this.#statusCode });
  }
}
