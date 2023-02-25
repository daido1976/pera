// TODO: Support more utility methods.
export class PeraResponse {
  #_status = 200;

  status(status: number): PeraResponse {
    this.#_status = status;
    return this;
  }

  json(json: unknown): Response {
    return Response.json(json, { status: this.#_status });
  }

  // TODO: Currently, only absolute paths can be specified, but relative paths should be able to be specified as well.
  redirect(url: string | URL): Response {
    const status = isRedirectStatus(this.#_status) ? this.#_status : 302;
    return Response.redirect(url, status);
  }

  text(text: string): Response {
    const headers = {
      "Content-Type": "text/plain",
    };
    return new Response(text, { headers, status: this.#_status });
  }
}

// See. https://github.com/denoland/deno/blob/v1.30.3/ext/fetch/23_response.js#L85-L92
function isRedirectStatus(status: number) {
  return [301, 302, 303, 307, 308].includes(status);
}
