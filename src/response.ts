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

  // TODO: Currently, only absolute paths can be specified, but relative paths should be able to be specified as well.
  redirect(url: string | URL): Response {
    const status = isRedirectStatus(this.#statusCode) ? this.#statusCode : 302;
    return Response.redirect(url, status);
  }

  text(text: string): Response {
    const headers = {
      "Content-Type": "text/plain",
    };
    return new Response(text, { headers, status: this.#statusCode });
  }
}

// See. https://github.com/denoland/deno/blob/v1.30.3/ext/fetch/23_response.js#L85-L92
function isRedirectStatus(status: number) {
  return (
    status === 301 ||
    status === 302 ||
    status === 303 ||
    status === 307 ||
    status === 308
  );
}
