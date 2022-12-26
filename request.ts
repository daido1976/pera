export interface MicroRequest extends Request {
  params: {
    [key: string]: string;
  };
  query: {
    [key: string]: string | string[];
  };
}
